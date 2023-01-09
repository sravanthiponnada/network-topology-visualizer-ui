import { browser, by, element } from 'protractor';

export class MapPage {

  navigateTo() {
    return browser.get('/map');
  }
}
