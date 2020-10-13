import date from './tools/date';
import checkEnvVariables from './utils/checkEnvVariables';
import consoleWriteLine from './utils/consoleWriteLine';
import Worker from './Worker';

// Verify if all .env variables are set before continue.
checkEnvVariables();

// Set date local
date.setLocal();

// Boot message
consoleWriteLine('Up and running..');

// Instantiate our worker
const worker = new Worker();

// Start our worker
worker.startAsync();
