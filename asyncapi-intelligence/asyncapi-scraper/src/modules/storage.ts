import { promises as fs } from 'fs';
import * as path from 'path';
import { config } from '../config/config';
import { ScrapedData } from '../interfaces/types';

export class Storage {
  static async saveData(url: string, data: ScrapedData): Promise<void> {
    const urlPath = new URL(url).pathname.replace('/docs', '').replace(/^\//, '').replace(/\/$/, '') || 'index';
    const safeUrl = urlPath.replace(/[^a-zA-Z0-9]/g, '_');
    const filePath = path.join(config.outputDir, `${safeUrl}.json`);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }
}