import date from './date';

const consoleWriteLine = (log: string, inNextLine = false, error = false): void =>
  // eslint-disable-next-line no-console
  console[error ? 'error' : 'log'](`${inNextLine ? '\n' : ''}[${date.displayNow()}] ${log}`);

export default consoleWriteLine;
