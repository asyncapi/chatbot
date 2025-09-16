import * as cheerio from 'cheerio';
import { ScrapedData, Section } from '../interfaces/types';

export class Formatter {
  static formatForFineTuning(
    url: string,
    html: string,
    hierarchy: { sections: Record<string, Section>; navigation: any[] },
    svgs: any[],
    codeBlocks: any[],
    tables: any[],
    highlights: any[]
  ): ScrapedData {
    const $ = cheerio.load(html);
    const mainContent = $('#main-content > div:nth-child(2) > main > div:nth-child(2) > div:nth-child(2) > article');
    let fullText = mainContent.text().trim();
    // Clean up Mermaid SVG styles from full_text
    fullText = fullText.replace(/#mermaid-\d+{[^}]+}.*?(?=PRODUCER|parent|$)/g, '').trim();

    const title = mainContent.find('h1').first().text().trim() || 
                  url.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 
                  'Untitled';

    return {
      metadata: {
        url,
        timestamp: new Date().toISOString(),
        source: 'asyncapi_docs'
      },
      content: {
        title,
        hierarchy,
        full_text: fullText,
        sections: Object.entries(hierarchy.sections).map(([title, data]) => ({
          title,
          level: data.level,
          text: data.content
        })),
        svgs,
        codeBlocks,
        tables,
        highlights
      }
    };
  }
}