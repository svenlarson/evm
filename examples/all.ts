import { EVM } from '../src/index';
import * as fs from 'fs';
const glob = require('glob');
const path = require('path');

glob('examples/data/*bin', {}, (er: any, files: any) => {
    files.forEach((fileName: any) => {
        const data = fs.readFileSync(fileName).toString('utf8');

        console.log(fileName);

        const extension = path.extname(fileName);
        const basename = path.basename(fileName, extension);
        const dirname = path.dirname(fileName);

        const logdir = dirname + '/' + basename + '/';
        // tslint:disable-next-line: no-empty
        fs.mkdir(logdir, { recursive: true }, err => {});
        // tslint:disable-next-line: no-empty
        fs.writeFile(logdir + 'log.txt', '', {}, err => {});

        const evm = new EVM(data);
        evm.logdirectory = logdir;
        const decompiled = evm.decompile();

        // tslint:disable-next-line: no-empty
        fs.writeFile(logdir + basename + '.sol', decompiled, {}, err => {});
    });
});
