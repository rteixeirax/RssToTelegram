import date from '../src/core/tools/date';
import Worker from '../src/app/Worker';

describe('Worker', () => {
  beforeAll(() => {
    date.setLocal();
  });

  it('Should construct without issues', async () => {
    const sut = new Worker();
    expect(sut).toBeDefined();
  });

  it('Should call executeAsync once on init', async () => {
    const sut = new Worker();
    const spy = jest.spyOn(sut, 'executeAsync');
    await sut.init();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
