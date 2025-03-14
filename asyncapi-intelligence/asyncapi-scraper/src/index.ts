import { DocsScraper } from './scrapers/docsScraper';
// import { RepoScraper } from './scrapers/repoScraper';
// import { ToolsScraper } from './scrapers/toolsScraper';

async function main() {
  const docsScraper = new DocsScraper();
//   const repoScraper = new RepoScraper();
//   const toolsScraper = new ToolsScraper();

  try {
    await docsScraper.scrape();
    // await repoScraper.scrapeRepo('https://github.com/asyncapi/generator');
    // await toolsScraper.scrapeTools();
  } catch (error) {
    console.error('Scraping failed:', error);
  }
}

main();