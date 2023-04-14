#!/usr/bin/env node
import figlet from 'figlet';
import { Command } from 'commander';
import chalky from './utils/chalky.js';
import init from './actions/init.js';

const program = new Command();

program
  .version('0.0.1', '-v, --version', 'Muestra la versión del CLI')
  .name('shop-api')
  .option('-h, --help', 'Muestra los comandos disponibles')
  .description(
    chalky(
      figlet.textSync(`Shop Api  -  CLI`, {
        font: 'Doom',
      }),
      ['green']
    )
  );

program
  .command('gen <module_name>')
  .description(
    chalky('Genera una estructura de carpetas y archivos de forma automatizada', ['bold', 'red'])
  )
  .action((module) => {
    init('src/modules', module);
  });

program.parse(process.argv);
