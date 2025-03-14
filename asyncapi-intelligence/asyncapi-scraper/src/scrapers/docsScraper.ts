import { config } from '../config/config';
import { Browser } from '../modules/browser';
import { Extractor } from '../modules/extractor';
import { Formatter } from '../modules/formatter';
import { Storage } from '../modules/storage';

export class DocsScraper {
  async scrape(): Promise<void> {
    await this.initialize();
    const visited = new Set<string>();
    const toVisit = new Set<string>([config.baseUrl]);

    while (toVisit.size > 0) {
      const url = toVisit.values().next().value as string;
      toVisit.delete(url);

      if (visited.has(url)) continue;
      visited.add(url);

      console.log(`Scraping: ${url}`);
      const html = await Browser.scrapePage(url);
      if (!html) continue;

      const { links, hierarchy, svgs, codeBlocks, tables, highlights } = Extractor.extractNavigationAndContent(html, config.baseUrl);
      const formattedData = Formatter.formatForFineTuning(url, html, hierarchy, svgs, codeBlocks, tables, highlights);
      await Storage.saveData(url, formattedData);

      for (const link of links) {
        if (!visited.has(link)) toVisit.add(link);
      }

      await this.sleep(config.rateLimitDelay);
    }

    console.log('Scraping completed');
  }

  private async initialize(): Promise<void> {
    // Any initialization logic can go here if needed
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}