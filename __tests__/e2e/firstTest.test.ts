import {log, expect} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {});

  it('should test something', async () => {
    await expect(element(by.id('menuButtonTest'))).toBeVisible();

    log.info('tapping menu...');
    await element(by.id('menuButtonTest')).tap();

    log.info('tapping beans...');
    await element(by.id('BeansLabelTest')).tap();
  });
});
