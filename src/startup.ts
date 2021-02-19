import consoleWriteLine from './core/tools/consoleWriteLine';
import date from './core/tools/date';
import { checkEnvVariables } from './core/validators';

import Worker from './app/Worker';

// Verify if all .env variables are set before continue.
checkEnvVariables();

// Set date local
date.setLocal();

// Boot message
consoleWriteLine('Up and running..');

// Instantiate our worker
const worker = new Worker();

// Start our worker
worker.init();
