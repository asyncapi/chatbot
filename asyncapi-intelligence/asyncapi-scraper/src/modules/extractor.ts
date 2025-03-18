import * as cheerio from 'cheerio';
import { NavigationItem, SVGData, CodeBlock, TableData, Highlight, Section } from '../interfaces/types';

export class Extractor {
  static extractNavigationAndContent(html: string, baseUrl: string): {
    links: Set<string>;
    hierarchy: { sections: Record<string, Section>; navigation: NavigationItem[] };
    svgs: SVGData[];
    codeBlocks: CodeBlock[];
    tables: TableData[];
    highlights: Highlight[];
  } {
    const $ = cheerio.load(html);
    const links = new Set<string>();
    const hierarchy: { sections: Record<string, Section>; navigation: NavigationItem[] } = { sections: {}, navigation: [] };
    const svgs: SVGData[] = [];
    const codeBlocks: CodeBlock[] = [];
    const tables: TableData[] = [];
    const highlights: Highlight[] = [];

    // Navigation extraction
    $('li[data-testid="DocsNav-item"]').each((i, elem) => {
      const mainLink = $(elem).find('a').first();
      const mainHref = mainLink.attr('href');
      const mainText = mainLink.find('span').text().trim();
      if (mainHref) {
        const fullMainUrl = mainHref.startsWith('/') ? `https://www.asyncapi.com${mainHref}` : new URL(mainHref, baseUrl).href;
        if (fullMainUrl.includes('/docs')) {
          links.add(fullMainUrl);
          const subNav: { text: string; href: string }[] = [];
          $(elem).find('li[data-testid="DocsNav-subitem"] a').each((j, subElem) => {
            const subHref = $(subElem).attr('href');
            const subText = $(subElem).text().trim();
            if (subHref) {
              const fullSubUrl = subHref.startsWith('/') ? `https://www.asyncapi.com${subHref}` : new URL(subHref, baseUrl).href;
              if (fullSubUrl.includes('/docs')) {
                links.add(fullSubUrl);
                subNav.push({ text: subText, href: fullSubUrl });
              }
            }
          });
          hierarchy.navigation.push({ text: mainText, href: fullMainUrl, subItems: subNav });
        }
      }
    });

    const mainContent = $('#main-content > div:nth-child(2) > main > div:nth-child(2) > div:nth-child(2) > article');
    mainContent.find('h1, h2, h3, h4, h5, h6').each((i, elem) => {
      const level = parseInt((elem as cheerio.TagElement).tagName.replace('h', ''));
      const text = $(elem).text().trim();
      let content = $(elem).nextUntil(`h${level}, h${level - 1}`).text().trim();
      // Clean up Mermaid SVG styles from content
      content = content.replace(/#mermaid-\d+{[^}]+}.*?(?=PRODUCER|parent|$)/g, '').trim();
      hierarchy.sections[text] = { level, content };
    });

    mainContent.find('svg').each((i, elem) => {
      const svgContent = $.html(elem);
      const parentContext = $(elem).parent().text().trim();
      svgs.push({ id: `svg_${i}`, content: svgContent, context: parentContext, description: this.generateSVGDescription(svgContent) });
    });

    mainContent.find('pre code').each((i, elem) => {
      const codeContent = $(elem).text().trim();
      const rawHtml = $.html(elem);
      const language = $(elem).attr('class')?.includes('language-') ? $(elem).attr('class')!.split('language-')[1].split(' ')[0] : 'unknown';
      codeBlocks.push({ id: `code_${i}`, content: codeContent, rawHtml, language, context: $(elem).parent().prev().text().trim() });
    });

    mainContent.find('table').each((i, elem) => {
      const headers: string[] = [];
      const rows: Record<string, string>[] = [];
      $(elem).find('thead tr th').each((j, th) => headers.push($(th).text().trim()));
      $(elem).find('tbody tr').each((j, tr) => {
        const row: Record<string, string> = {};
        $(tr).find('td').each((k, td) => (row[headers[k]] = $(td).text().trim()));
        rows.push(row);
      });
      tables.push({ id: `table_${i}`, headers, rows, context: $(elem).parent().prev().text().trim() });
    });

    mainContent.find('code:not(pre code)').each((i, elem) => {
      highlights.push({ id: `highlight_${i}`, content: $(elem).text().trim(), context: $(elem).parent().text().trim() });
    });

    return { links, hierarchy, svgs, codeBlocks, tables, highlights };
  }

  private static generateSVGDescription(svgContent: string): string {
    const $ = cheerio.load(svgContent);
    const paths = $('path').length;
    const circles = $('circle').length;
    const rects = $('rect').length;
    return `SVG containing ${paths} paths, ${circles} circles, and ${rects} rectangles.`;
  }
}