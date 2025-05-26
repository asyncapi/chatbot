// import { Browser } from '../modules/browser';
// import { Storage } from '../modules/storage';

// export class ToolsScraper {
//   async scrapeTools(toolsUrl: string = 'https://www.asyncapi.com/tools'): Promise<void> {
//     console.log(`Scraping tools page: ${toolsUrl}`);
//     const html = await Browser.scrapePage(toolsUrl);
//     if (!html) return;

//     const data = {
//       metadata: {
//         url: toolsUrl,
//         timestamp: new Date().toISOString(),
//         source: 'asyncapi_tools'
//       },
//       content: {
//         tools: this.extractTools(html)
//       }
//     };

//     await Storage.saveData(toolsUrl, data);
//   }

//   private extractTools(html: string): { name: string; description: string }[] {
//     const $ = cheerio.load(html);
//     const tools: { name: string; description: string }[] = [];
//     // Adjust selector based on actual tools page structure
//     $('.tool-item').each((i, elem) => {
//       tools.push({
//         name: $(elem).find('.tool-name').text().trim(),
//         description: $(elem).find('.tool-description').text().trim()
//       });
//     });
//     return tools;
//   }
// }