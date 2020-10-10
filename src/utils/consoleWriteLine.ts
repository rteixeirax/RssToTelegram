const consoleWriteLine = (
  log: string,
  inNextLine = false,
  error = false
): void =>
  // eslint-disable-next-line no-console
  console[error ? 'error' : 'log'](
    `${inNextLine ? '\n' : ''}[${new Date().toLocaleString()}] ${log}`
  );

export default consoleWriteLine;
