import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { config } from '../config/config';

puppeteer.use(StealthPlugin());

function getRandomInt(min: number, max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return min + (array[0] % (max - min + 1));
}

export class Browser {
  static async scrapePage(url: string, retryCount = 0): Promise<string | null> {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--disable-gpu']
      });
      const page = await browser.newPage();
      await page.setUserAgent(this.getRandomUserAgent());
      await page.setViewport({ width: 1280 + getRandomInt(0, 100), height: 720 + getRandomInt(0, 100) });
      await page.setRequestInterception(true);
      page.on('request', (request) => request.continue());
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await this.sleep(1000);
      const content = await page.content();
      await browser.close();
      return content;
    } catch (error) {
      if (retryCount < config.maxRetries) {
        console.log(`Retrying ${url} (${retryCount + 1}/${config.maxRetries})`);
        await this.sleep(config.rateLimitDelay * (retryCount + 1));
        return this.scrapePage(url, retryCount + 1);
      }
      console.error(`Failed to scrape ${url}: ${(error as Error).message}`);
      return null;
    }
  }

  private static getRandomUserAgent(): string {
    return config.userAgents[getRandomInt(0, config.userAgents.length - 1)];
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
