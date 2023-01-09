import { browser, by, element } from 'protractor';
import {promise} from 'selenium-webdriver';
import all = promise.all;
import {RouterNodeDecoratorTypeEnum} from '../../src/app/model/enums/router-node-decorator-type-enum';
import {HostNodeDecoratorTypeEnum} from '../../src/app/model/enums/host-node-decorator-type-enum';
import {LinkDecoratorTypeEnum} from '../../src/app/model/enums/link-decorator-type-enum';

export class GraphPage {

  navigateTo() {
    return browser.get('/graph');
  }

  toggleSidebar() {
    element(by.className('sidenav-button')).click();
  }

  getSidebar() {
    return element(by.css('app-force-graph-sidebar'));
  }

  getSidebarDrawer() {
    return element(by.css('mat-drawer'));
  }

  getZoomButton() {
    return element(by.className('zoom-reset'));
  }

  getNode() {
    return element(by.className('node'));
  }

  getLink() {
    return element(by.className('link'));
  }

  getGraph() {
    return element(by.css('graph'));
  }

  getNodes() {
   return element.all(by.className('node'));
  }

  getLinks() {
   return element.all(by.className('link'));
  }

  getDecoratorsTab() {
    return element(by.css('div#mat-tab-label-0-0'));
  }

  getLayoutTab() {
    return element(by.css('div#mat-tab-label-0-1'));
  }

  getDecoratorFiltersPanel() {
    return element(by.cssContainingText('mat-expansion-panel', 'Decorator filters'));
  }

  getDecoratorRefreshPeriodPanel() {
    return element(by.cssContainingText('mat-expansion-panel', 'Decorator refresh period'));
  }

  getDecoratorTimePickerPanel() {
    return element(by.cssContainingText('mat-expansion-panel', 'Decorator time picker'));
  }

  getControlsPanel() {
    return element(by.cssContainingText('mat-expansion-panel', 'Controls'));
  }

  getLayoutsPanel() {
    return element(by.cssContainingText('mat-expansion-panel', 'Layouts'));
  }

  getDecoratorFiltersToggle() {
    return this.getDecoratorFiltersPanel().element(by.css('mat-slide-toggle'));
  }

  getAutomaticRefreshToggle() {
    return this.getDecoratorRefreshPeriodPanel().element(by.css('mat-slide-toggle'));
  }

  getDatePickerToggle() {
    return this.getDecoratorTimePickerPanel().element(by.css('mat-slide-toggle'));
  }

  getRouterDecoratorCategoryCheckbox() {
    return element(by.cssContainingText('mat-checkbox', 'Router decorators'));
  }

  getHostDecoratorCategoryCheckbox() {
    return element(by.cssContainingText('mat-checkbox', 'Host decorators'));
  }

  getLinkDecoratorCategoryCheckbox() {
    return element(by.cssContainingText('mat-checkbox', 'Link decorators'));
  }

  getAllRouterTypeDecoratorCheckboxes() {
    const elements = [];
    Object.values(RouterNodeDecoratorTypeEnum).forEach(name => {
      elements.push(element(by.cssContainingText('mat-card', 'Router decorators'))
        .element(by.cssContainingText('mat-checkbox', name)));
    });
    return elements;
  }
  getAllHostTypeDecoratorCheckboxes() {
    const elements = [];
    Object.values(HostNodeDecoratorTypeEnum).forEach(name => {
      elements.push(element(by.cssContainingText('mat-card', 'Host decorators'))
        .element(by.cssContainingText('mat-checkbox', name)));
    });
    return elements;
  }
  getAllLinkTypeDecoratorCheckboxes() {
    const elements = [];
    Object.values(LinkDecoratorTypeEnum).forEach(name => {
      elements.push(element(by.cssContainingText('mat-card', 'Link decorators'))
        .element(by.cssContainingText('mat-checkbox', name)));
    });
    return elements;
  }

  getRefreshRateSlider() {
    return element(by.css('mat-slider'));
  }

  getRefreshRateSliderThumb() {
    return this.getRefreshRateSlider().element(by.css('div.mat-slider-thumb'));
  }

  getControlsCollapseButton() {
    return this.getControlsPanel().element(by.cssContainingText('button', 'Collapse all'));
  }
  getControlsExpandButton() {
    return this.getControlsPanel().element(by.cssContainingText('button', 'Expand all'));
  }

  getLayoutsToggle() {
    return this.getLayoutsPanel().element(by.css('mat-slide-toggle'));
  }

  getHierarchicalLayoutRadio() {
    return this.getLayoutsPanel().element(by.cssContainingText('mat-radio-button', 'Hierarchical layout'));
  }

  doubleClick(element) {
    browser.actions().mouseMove(element).perform();
    browser.actions().doubleClick(element).perform();
  }

  dragAndDrop(element, x, y) {
    browser.actions().mouseMove(element).perform();
    browser.actions().mouseDown().perform();
    browser.actions().mouseMove({x, y}).perform();
    browser.actions().mouseUp().perform();
  }

  click(element) {
    browser.actions().mouseMove(element).perform();
    browser.actions().click(element).perform();
  }

  zoomIn() {
    element(by.className('zoom-in')).click();
  }

  zoomOut() {
    element(by.className('zoom-out')).click();
  }
}
