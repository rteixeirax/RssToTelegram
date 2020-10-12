const consoleWriteLine = (
  log: string,
  inNextLine = false,
  error = false
): void =>
  // eslint-disable-next-line no-console
  console[error ? 'error' : 'log'](
    `${inNextLine ? '\n' : ''}[${new Date().toLocaleString(
      process.env.DATE_LOCALE!
    )}] ${log}`
  );

export default consoleWriteLine;
