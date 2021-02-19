import { IS_TEST } from '../constants';
import date from './date';

/* istanbul ignore next */
const consoleWriteLine = (log: string, inNextLine = false, error = false): void => {
  if (!IS_TEST) {
    // eslint-disable-next-line no-console
    console[error ? 'error' : 'log'](`${inNextLine ? '\n' : ''}[${date.displayNow()}] ${log}`);
  }
};

export default consoleWriteLine;
