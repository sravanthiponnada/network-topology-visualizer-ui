import {browser} from 'protractor';
import {AppPage} from './app.po';

describe('app-E2E', () => {
  let page: AppPage;
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    page = new AppPage();
    page.navigateTo();
  });

  it('should display a title', () => {
    page.getTitle().then((title) => {
      expect(title).toEqual('Topology visualization');
    });
  });
});
