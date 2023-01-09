import { Component, OnInit } from '@angular/core';
import {GraphEventService} from '../../../services/graph-event.service';
import {GraphLayoutsEnum} from '../../../model/enums/graph-layouts-enum';

@Component({
  selector: 'app-layout-tab',
  templateUrl: './layout-tab.component.html',
  styleUrls: ['./layout-tab.component.css']
})
export class LayoutTabComponent implements OnInit {

  layouts: GraphLayoutsEnum[];
  activeLayout;
  layoutDisabled = true;

  constructor(private graphEventService: GraphEventService) {
    this.layouts = Object.values(GraphLayoutsEnum);
  }


  ngOnInit() {
  }

  /**
   * Turns on/off layouts
   */
  toggleLayouts() {
    this.layoutDisabled = !this.layoutDisabled;
    if (!this.layoutDisabled) {
      this.setActiveLayout(this.activeLayout);
    } else {
      this.disableLayouts();
    }
  }

  /**
   * disables layout
   */
  private disableLayouts() {
    this.activeLayout = null;
    this.graphEventService.turnOffForces();
  }

  /**
   * Sets current active layout
   * @param activeLayout a layout which should be set as active
   */
  setActiveLayout(activeLayout) {
    this.graphEventService.turnOffForces();
    switch (activeLayout) {
      case GraphLayoutsEnum.Hierarchical: {
        this.graphEventService.hierarchicalLayout();
        break;
      }
      default:
        break;
    }
  }

  /**
   * Collapses all nodes
   */
  collapseAll() {
    this.graphEventService.collapseAll();
  }

  /**
   * Expands all nodes
   */
  expandAll() {
    this.graphEventService.expandAll();
  }
}
