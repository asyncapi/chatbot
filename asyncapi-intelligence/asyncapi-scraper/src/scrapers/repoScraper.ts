// import { Browser } from '../modules/browser';
// import { Storage } from '../modules/storage';

// export class RepoScraper {
//   async scrapeRepo(repoUrl: string): Promise<void> {
//     console.log(`Scraping GitHub repo: ${repoUrl}`);
//     const html = await Browser.scrapePage(repoUrl);
//     if (!html) return;

//     const data = {
//       metadata: {
//         url: repoUrl,
//         timestamp: new Date().toISOString(),
//         source: 'github_repo'
//       },
//       content: {
//         readme: this.extractReadme(html),
//         files: this.extractFileList(html)
//       }
//     };

//     await Storage.saveData(repoUrl, data);
//   }

//   private extractReadme(html: string): string {
//     const $ = cheerio.load(html);
//     return $('#readme').text().trim();
//   }

//   private extractFileList(html: string): string[] {
//     const $ = cheerio.load(html);
//     const files: string[] = [];
//     $('.js-navigation-item .content a').each((i, elem) => files.push($(elem).text().trim()));
//     return files;
//   }
// }