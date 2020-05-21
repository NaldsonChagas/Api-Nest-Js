import { Injectable } from '@nestjs/common';
import * as filesystem from 'fs';
import * as os from 'os';

@Injectable()
export class CsvService {
  generateCsv (fileName: string, header: string, content: string[]) {
    const path = `${os.homedir()}/temp/${fileName}.csv`;
    content.forEach((content, index) => {
      if (index === 0) content = header + '\n' + content;
      filesystem.writeFile(
        path,
        content,
        {
          flag: 'a',
          encoding: 'utf-8'
        },
        (err) => console.log(err));
    });
    return path;
  }
}
