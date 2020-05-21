import { Injectable } from '@nestjs/common';
import * as filesystem from 'fs';
import * as os from 'os';

@Injectable()
export class CsvService {
  generateCsv (fileName: string, header: string, lines: string[]) {
    const path = `${os.homedir()}/temp/${fileName}.csv`;
    lines.forEach((line, index) => {
      if (index === 0) line = header + '\n' + line;
      filesystem.writeFile(
        path,
        line + '\n',
        {
          flag: 'a',
          encoding: 'utf-8'
        },
        (err) => console.log(err));
    });
    return path;
  }
}
