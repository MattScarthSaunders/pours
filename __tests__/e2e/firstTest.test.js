describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {});

  it('should test something', async () => {
    await expect(element(by.id('homeTextTest'))).toBeVisible();
    await expect(element(by.id('homeTextTest'))).toHaveText(
      "This app is vastly overengineered for what it does. It's basically just forms, tables and memory. It has a bunch of extra features it doesn't need, because it is a playground to learn React Native. Now disengage your brain and use the menu to select the only available page.",
    );
  });
});
