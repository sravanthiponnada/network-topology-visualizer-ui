import {browser} from 'protractor';
import {MapPage} from './map.po';

describe('map-E2E', () => {
  let page: MapPage;
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    page = new MapPage();
    page.navigateTo();
  });
});
