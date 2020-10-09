import checkEnvVariables from './utils/checkEnvVariables';
import Worker from './Worker';

// Verify if all .env variables are set before continue.
checkEnvVariables();

// Instantiate our worker
const worker = new Worker();

// Start our worker
worker.startAsync();
