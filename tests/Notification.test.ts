import date from '../src/core/tools/date';
import Notification from '../src/app/Notification';

import rssMockData from './mocks/rssMockData';
import rssMockDataWithNewItem from './mocks/rssMockDataWithNewItem';

describe('Notification', () => {
  beforeAll(() => {
    date.setLocal();
  });

  it('Should contruct without issues', async () => {
    const sut = new Notification();
    expect(sut).toBeDefined();
  });

  it('Should call fetchAsync and refreshAsync on init', async () => {
    const sut = new Notification();
    const spyFetchAsync = jest.spyOn(sut, 'fetchAsync');
    const spyRefreshAsync = jest.spyOn(sut, 'refreshAsync');
    await sut.init();
    expect(spyFetchAsync).toHaveBeenCalledTimes(1);
    expect(spyRefreshAsync).toHaveBeenCalledTimes(1);
  });

  it('Should call refreshAsync two times, with data and with new data', async () => {
    const sut = new Notification();
    const spyRefreshAsync = jest.spyOn(sut, 'refreshAsync');
    const spySendAsync = jest.spyOn(sut, 'sendAsync');
    await sut.refreshAsync(rssMockData);
    expect(spyRefreshAsync).toHaveBeenCalledTimes(1);
    expect(spySendAsync).toHaveBeenCalledTimes(1);
    await sut.refreshAsync(rssMockDataWithNewItem);
    expect(spySendAsync).toHaveBeenCalledTimes(2);
  });
});
