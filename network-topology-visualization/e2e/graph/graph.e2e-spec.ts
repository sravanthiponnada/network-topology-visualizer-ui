import {browser} from 'protractor';
import {GraphPage} from './graph.po';

describe('graph-E2E', () => {
  let page: GraphPage;
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    page = new GraphPage();
    page.navigateTo();
  });


  it('should have opened a sidebar', () => {
    const drawer = page.getSidebarDrawer();
    expect(drawer).toBeDefined('Sidebar drawer not found');
    expect(drawer).not.toBeNull('Sidebar drawer not found');

    drawer.getAttribute('style').then(beforeValue => {
      const beforeOpen = beforeValue;
      expect(beforeOpen).toBeDefined('drawer does not have expected attribute "style"');
      expect(beforeOpen).not.toBeNull('drawer does not have expected attribute "style"');
      expect(beforeOpen).toContain('hidden', 'sidebar was not hidden on a start');

      page.toggleSidebar();

      // time to let the angular material react on events and change the attributes
      browser.sleep(500);

      drawer.getAttribute('style').then(afterValue => {
        const afterOpen = afterValue;
        expect(afterOpen).toBeDefined('drawer does not have expected attribute "style"');
        expect(afterOpen).not.toBeNull('drawer does not have expected attribute "style"');
        expect(afterOpen).toContain('visible', 'sidebar not visible after opening');
        expect(beforeOpen).not.toEqual(afterOpen);
      });
    });
  });

  it('should have opened and close a sidebar', () => {
    const drawer = page.getSidebarDrawer();
    expect(drawer).toBeDefined('Sidebar drawer not found');
    expect(drawer).not.toBeNull('Sidebar drawer not found');

    drawer.getAttribute('style').then(beforeValue => {
      const beforeOpen = beforeValue;
      expect(beforeOpen).toBeDefined('drawer does not have expected attribute "style"');
      expect(beforeOpen).not.toBeNull('drawer does not have expected attribute "style"');
      expect(beforeOpen).toContain('hidden', 'sidebar was not hidden on a start');

      page.toggleSidebar();
      // time to let the angular material react on events and change the attributes
      browser.sleep(500);

      drawer.getAttribute('style').then(afterValue => {
        const afterOpen = afterValue;
        expect(afterOpen).toBeDefined('drawer does not have expected attribute "style"');
        expect(afterOpen).not.toBeNull('drawer does not have expected attribute "style"');
        expect(afterOpen).toContain('visible', 'sidebar not visible after opening');
        expect(beforeOpen).not.toEqual(afterOpen);

        page.toggleSidebar();
        // time to let the angular material react on events and change the attributes
        browser.sleep(500);

        drawer.getAttribute('style').then(afterHideValue => {
          const afterHide = afterHideValue;
          expect(afterHide).toBeDefined('drawer does not have expected attribute "style"');
          expect(afterHide).not.toBeNull('drawer does not have expected attribute "style"');
          expect(afterHide).toContain('hidden', 'sidebar not hidden after closing');
          expect(afterOpen).not.toEqual(afterHide);
        });
      });
    });
  });

  it('should have opened decorator filter menu and toggle all decorators', () => {
    page.toggleSidebar();
    page.click(page.getDecoratorsTab());
    page.click(page.getDecoratorFiltersPanel());

    const toggle = page.getDecoratorFiltersToggle();
    let checkedBefore;
    toggle.getAttribute('ng-reflect-checked').then(value => {
      checkedBefore = value;

      page.click(toggle);

      let checkedAfter;
      toggle.getAttribute('ng-reflect-checked').then(valueAfter => {
        checkedAfter = valueAfter;

        expect(checkedBefore).toBeDefined('"checked" attribute before toggling is missing');
        expect(checkedBefore).not.toBeNull('"checked" attribute before toggling is missing');
        expect(checkedAfter).toBeDefined('"checked" attribute after toggling is missing');
        expect(checkedAfter).not.toBeNull('"checked" attribute after toggling is missing');
        expect(checkedAfter).not.toEqual(checkedBefore);
      });
    });
  });

  it('should have opened decorator filter menu and toggle all decorators twice', () => {
    page.toggleSidebar();
    page.click(page.getDecoratorsTab());
    page.click(page.getDecoratorFiltersPanel());

    const toggle = page.getDecoratorFiltersToggle();
    let checkedBefore;
    toggle.getAttribute('ng-reflect-checked').then(value => {
      checkedBefore = value;

      page.click(toggle);

      let checkedAfter;
      toggle.getAttribute('ng-reflect-checked').then(valueAfter => {
        checkedAfter = valueAfter;

        expect(checkedBefore).toBeDefined('"checked" attribute before first toggling is missing');
        expect(checkedBefore).not.toBeNull('"checked" attribute before first toggling is missing');
        expect(checkedAfter).toBeDefined('"checked" attribute after first toggling is missing');
        expect(checkedAfter).not.toBeNull('"checked" attribute after first toggling is missing');
        expect(checkedAfter).not.toEqual(checkedBefore);

        page.click(toggle);
        let checkedAfterSecondToggle;
        toggle.getAttribute('ng-reflect-checked').then(valueAfterSecond => {
          checkedAfterSecondToggle = valueAfterSecond;

          expect(checkedBefore).toBeDefined('"checked" attribute before second toggling is missing');
          expect(checkedBefore).not.toBeNull('"checked" attribute before second toggling is missing');
          expect(checkedAfterSecondToggle).toBeDefined('"checked" attribute after second toggling is missing');
          expect(checkedAfterSecondToggle).not.toBeNull('"checked" attribute after second toggling is missing');
          expect(checkedAfterSecondToggle).toEqual(checkedBefore);
        });
      });
    });
  });

  it('should have enabled/disabled all filter checkboxes after enabling/disabling decorators', () => {
    page.toggleSidebar();
    page.click(page.getDecoratorsTab());
    page.click(page.getDecoratorFiltersPanel());

    const toggle = page.getDecoratorFiltersToggle();
    let checkedBefore;
    const checkboxes = [];
    checkboxes.push(page.getLinkDecoratorCategoryCheckbox());
    checkboxes.push(page.getRouterDecoratorCategoryCheckbox());
    checkboxes.push(page.getHostDecoratorCategoryCheckbox());
    page.getAllLinkTypeDecoratorCheckboxes().forEach(checkbox => checkboxes.push(checkbox));
    page.getAllRouterTypeDecoratorCheckboxes().forEach(checkbox => checkboxes.push(checkbox));
    page.getAllHostTypeDecoratorCheckboxes().forEach(checkbox => checkboxes.push(checkbox));

    toggle.getAttribute('ng-reflect-checked').then(value => {
      checkedBefore = value;

      expect(checkedBefore).toBeDefined('BEFORE TOGGLING - toggle is missing attribute "checked"');
      expect(checkedBefore).not.toBeNull('BEFORE TOGGLING - toggle is missing attribute "checked"');

      checkboxes.forEach(checkbox => {
        checkbox.getAttribute('ng-reflect-disabled').then(attrValue => {
          expect(attrValue).toBeDefined('BEFORE TOGGLING - checkbox: ' + checkbox + 'is missing attribute "disabled"');
          expect(attrValue).not.toBeNull('BEFORE TOGGLING - checkbox: ' + checkbox + 'is missing attribute "disabled"');
          expect(attrValue).not.toEqual(checkedBefore,
            'BEFORE TOGGLING - checkbox: ' + checkbox + ' "disabled" attribute is not matching the state of decorators toggle');
        });
      });

      page.click(toggle);
      toggle.getAttribute('ng-reflect-checked').then(afterValue => {

        expect(afterValue).toBeDefined('AFTER TOGGLING - toggle is missing attribute "checked"');
        expect(afterValue).not.toBeNull('AFTER TOGGLING - toggle is missing attribute "checked"');

        checkboxes.forEach(checkbox => {
          checkbox.getAttribute('ng-reflect-disabled').then(attrValue => {
            expect(attrValue).toBeDefined('AFTER TOGGLING - checkbox: ' + checkbox + 'is missing attribute "disabled"');
            expect(attrValue).not.toBeNull('AFTER TOGGLING - checkbox: ' + checkbox + 'is missing attribute "disabled"');
            expect(attrValue).not.toEqual(afterValue,
              'AFTER TOGGLING - checkbox: ' + checkbox + ' "disabled" attribute is not matching the state of decorators toggle');
          });
        });
      });
    });
  });

  it('should have reacted on change of parent decorator filter checkbox', () => {
    page.toggleSidebar();
    page.click(page.getDecoratorsTab());
    page.click(page.getDecoratorFiltersPanel());

    const toggle = page.getDecoratorFiltersToggle();
    toggle.getAttribute('ng-reflect-checked').then(value => {
      if (value.includes('false')) {
        page.click(toggle);
      }
    });

    const routerParentCheckbox = page.getRouterDecoratorCategoryCheckbox();
    const hostParentCheckbox = page.getHostDecoratorCategoryCheckbox();
    const linkParentCheckbox = page.getLinkDecoratorCategoryCheckbox();

    const routerChildCheckboxes = page.getAllRouterTypeDecoratorCheckboxes();
    const hostChildCheckboxes = page.getAllHostTypeDecoratorCheckboxes();
    const linkChildCheckboxes = page.getAllLinkTypeDecoratorCheckboxes();

    page.click(routerParentCheckbox);
    routerParentCheckbox.getAttribute('ng-reflect-model').then(parentValue => {
      expect(parentValue).toBeDefined('parent router checkbox is missing attribute "model"');
      expect(parentValue).not.toBeNull('parent router checkbox is missing attribute "model"');

      routerChildCheckboxes.forEach(checkbox => {
        checkbox.getAttribute('ng-reflect-model').then(childValue => {
          expect(childValue).toBeDefined('child router checkbox: ' + checkbox + ' is missing attribute "model"');
          expect(childValue).not.toBeNull('child router checkbox: ' + checkbox + ' is missing attribute "model"');
          expect(childValue).toEqual(parentValue,
            'child router checkbox state is inconsistent with its parent. Child checkbox ' + checkbox);
        });
      });
    });

    page.click(hostParentCheckbox);
    hostParentCheckbox.getAttribute('ng-reflect-model').then(parentValue => {
      expect(parentValue).toBeDefined('parent host checkbox is missing attribute "model"');
      expect(parentValue).not.toBeNull('parent host checkbox is missing attribute "model"');

      hostChildCheckboxes.forEach(checkbox => {
        checkbox.getAttribute('ng-reflect-model').then(childValue => {
          expect(childValue).toBeDefined('child host checkbox: ' + checkbox + ' is missing attribute "model"');
          expect(childValue).not.toBeNull('child host checkbox: ' + checkbox + ' is missing attribute "model"');
          expect(childValue).toEqual(parentValue,
            'child host checkbox state is inconsistent with its parent. Child checkbox ' + checkbox);
        });
      });
    });

    page.click(linkParentCheckbox);
    linkParentCheckbox.getAttribute('ng-reflect-model').then(parentValue => {
      expect(parentValue).toBeDefined('parent link checkbox is missing attribute "model"');
      expect(parentValue).not.toBeNull('parent link checkbox is missing attribute "model"');

      linkChildCheckboxes.forEach(checkbox => {
        checkbox.getAttribute('ng-reflect-model').then(childValue => {
          expect(childValue).toBeDefined('child link checkbox: ' + checkbox + ' is missing attribute "model"');
          expect(childValue).not.toBeNull('child link checkbox: ' + checkbox + ' is missing attribute "model"');
          expect(childValue).toEqual(parentValue,
            'child link checkbox state is inconsistent with its parent. Child checkbox ' + checkbox);
        });
      });
    });
  });

  it('should have reacted on change of child decorator filter checkbox', () => {
    page.toggleSidebar();
    page.click(page.getDecoratorsTab());
    page.click(page.getDecoratorFiltersPanel());

    const toggle = page.getDecoratorFiltersToggle();
    toggle.getAttribute('ng-reflect-checked').then(value => {
      if (value.includes('false')) {
        page.click(toggle);
      }
    });

    const routerParentCheckbox = page.getRouterDecoratorCategoryCheckbox();
    const hostParentCheckbox = page.getHostDecoratorCategoryCheckbox();
    const linkParentCheckbox = page.getLinkDecoratorCategoryCheckbox();

    const routerChildCheckboxes = page.getAllRouterTypeDecoratorCheckboxes();
    const hostChildCheckboxes = page.getAllHostTypeDecoratorCheckboxes();
    const linkChildCheckboxes = page.getAllLinkTypeDecoratorCheckboxes();

    page.click(routerChildCheckboxes[0]);
    routerChildCheckboxes[0].getAttribute('ng-reflect-model').then(childValue => {
      expect(childValue).toBeDefined('child router checkbox is missing attribute "model"');
      expect(childValue).not.toBeNull('child router checkbox is missing attribute "model"');
      routerParentCheckbox.getAttribute('ng-reflect-model').then(parentValue => {
        expect(parentValue).toBeDefined('parent router checkbox is missing attribute "model"');
        expect(parentValue).not.toBeNull('parent router checkbox is missing attribute "model"');
        expect(childValue).toEqual(parentValue, 'parent router checkbox is inconsistent with its child checkbox');
      });
    });

    page.click(hostChildCheckboxes[0]);
    hostChildCheckboxes[0].getAttribute('ng-reflect-model').then(childValue => {
      expect(childValue).toBeDefined('child host checkbox is missing attribute "model"');
      expect(childValue).not.toBeNull('child host checkbox is missing attribute "model"');
      hostParentCheckbox.getAttribute('ng-reflect-model').then(parentValue => {
        expect(parentValue).toBeDefined('parent host checkbox is missing attribute "model"');
        expect(parentValue).not.toBeNull('parent host checkbox is missing attribute "model"');
        expect(childValue).toEqual(parentValue, 'parent host checkbox is inconsistent with its child checkbox');
      });
    });

    page.click(linkChildCheckboxes[0]);
    linkChildCheckboxes[0].getAttribute('ng-reflect-model').then(childValue => {
      expect(childValue).toBeDefined('child link checkbox is missing attribute "model"');
      expect(childValue).not.toBeNull('child link checkbox is missing attribute "model"');
      linkParentCheckbox.getAttribute('ng-reflect-model').then(parentValue => {
        expect(parentValue).toBeDefined('parent link checkbox is missing attribute "model"');
        expect(parentValue).not.toBeNull('parent link checkbox is missing attribute "model"');
        expect(childValue).toEqual(parentValue, 'parent link checkbox is inconsistent with child checkbox');
      });
    });
  });

  it('should have not displayed reset zoom button when no zooming was performed', () => {
    const zoom = page.getZoomButton();
    expect(zoom.isPresent())
      .toBeFalsy('zoom center button was displayed without zooming');
  });

  it('should have displayed graph', () => {
    const graph = page.getGraph();
    expect(graph).toBeDefined('graph not found');
    expect(graph).not.toBeNull('graph not found');
    expect(graph.isPresent()).toBeTruthy('graph not found');
  });

  it('should have displayed at least one node', () => {
    const node = page.getNode();
    expect(node).toBeDefined('nodes not found');
    expect(node).not.toBeNull('nodes not found');
    expect(node.isPresent()).toBeTruthy('nodes not found');
  });

  it('should have displayed at least one link', () => {
    const link = page.getLink();
    expect(link).toBeDefined('links not found');
    expect(link).not.toBeNull('links not found');
    expect(link.isPresent()).toBeTruthy('links not found');
  });

  it('should have revealed subnetwork after double-click on router node', () => {
    const node = page.getNode();
    let nodesBeforeRevealing;
    let linksBeforeRevealing;

    page.getNodes().count().then((nodesBefore) => {
     nodesBeforeRevealing = nodesBefore;
     page.getLinks().count().then((linksBefore) => {
       linksBeforeRevealing = linksBefore;
      });

     page.doubleClick(node);

      page.getNodes().count().then((nodesAfter) => {
        expect(nodesBeforeRevealing).toBeGreaterThan(0);
        expect(nodesAfter).toBeGreaterThan(0);

        expect(nodesBeforeRevealing).toBeLessThan(nodesAfter, 'nodes did not reveal');
      });

      page.getLinks().count().then((linksAfter) => {
        expect(linksBeforeRevealing).toBeGreaterThan(0);
        expect(linksAfter).toBeGreaterThan(0);

        expect(linksBeforeRevealing).toBeLessThan(linksAfter, 'links did not reveal');
      });
    });
  });

  it('should have revealed all subnetworks after double-click on router nodes', () => {
    const nodes = page.getNodes();
    let nodesBeforeRevealing;
    let linksBeforeRevealing;

    nodes.each((node) => {
      page.getNodes().count().then((value) => {
        nodesBeforeRevealing = value;
      });
      page.getLinks().count().then((value) => {
        linksBeforeRevealing = value;
      });

      page.doubleClick(node);

      page.getNodes().count().then((afterNodeCount) => {
        expect(nodesBeforeRevealing).toBeGreaterThan(0);
        expect(afterNodeCount).toBeGreaterThan(0);

        expect(nodesBeforeRevealing).toBeLessThan(afterNodeCount, 'nodes did not reveal');
      });
      page.getLinks().count().then((afterLinkCount) => {
        expect(linksBeforeRevealing).toBeGreaterThan(0);
        expect(afterLinkCount).toBeGreaterThan(0);
        expect(linksBeforeRevealing).toBeLessThan(afterLinkCount, 'links did not reveal');
      });

    });
  });

  it('should have revealed and hide subnetwork after two double-click on router node', () => {
    const node = page.getNode();
    let nodesBeforeRevealing;
    let linksBeforeRevealing;

    page.getNodes().count().then((nodesBefore) => {
      nodesBeforeRevealing = nodesBefore;
      page.getLinks().count().then((linksBefore) => {
        linksBeforeRevealing = linksBefore;
      });

      page.doubleClick(node);

      page.getNodes().count().then((nodesAfter) => {
        expect(nodesBeforeRevealing).toBeGreaterThan(0);
        expect(nodesAfter).toBeGreaterThan(0);

        expect(nodesBeforeRevealing).toBeLessThan(nodesAfter, 'nodes did not reveal');
      });
      page.getLinks().count().then((linksAfter) => {
        expect(linksBeforeRevealing).toBeGreaterThan(0);
        expect(linksAfter).toBeGreaterThan(0);

        expect(linksBeforeRevealing).toBeLessThan(linksAfter, 'links did not reveal');
      });

      let nodesBeforeHiding;
      let linksBeforeHiding;

      page.getNodes().count().then((value) => {
        nodesBeforeHiding = value;
        page.getLinks().count().then((value) => {
          linksBeforeHiding = value;
        });

        page.doubleClick(node);

        page.getNodes().count().then((nodesAfter) => {
          expect(nodesBeforeHiding).toBeGreaterThan(0);
          expect(nodesAfter).toBeGreaterThan(0);

          expect(nodesBeforeHiding).toBeGreaterThan(nodesAfter, 'nodes did not reveal');
        });
        page.getLinks().count().then((linksAfter) => {
          expect(linksBeforeHiding).toBeGreaterThan(0);
          expect(linksAfter).toBeGreaterThan(0);
          expect(linksBeforeHiding).toBeGreaterThan(linksAfter, 'links did not reveal');
        });
      });
    });
  });

  it('should have dragged a node', () => {
    const node = page.getNode();
    let positionBeforeDrag;
    node.getAttribute('transform').then((attr) => {
      positionBeforeDrag = attr;

      page.dragAndDrop(node, 800, 800);

      node.getAttribute('transform').then((positionAfterDrag) => {
        expect(positionBeforeDrag).toBeDefined();
        expect(positionBeforeDrag).not.toBeNull();
        expect(positionAfterDrag).toBeDefined();
        expect(positionAfterDrag).not.toBeNull();

        expect(positionBeforeDrag).not.toEqual(positionAfterDrag, 'node was not dragged');
        });
    });
  });
});
