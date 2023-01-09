import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DecoratorFilterMenuComponent} from './force-graph-sidebar/decorator-filter-menu/decorator-filter-menu.component';
import {AbsoluteTimeComponent} from './force-graph-sidebar/decorator-time-picker/absolute-time/absolute-time.component';
import {RelativeTimeComponent} from './force-graph-sidebar/decorator-time-picker/relative-time/relative-time.component';
import {LayoutTabComponent} from './force-graph-sidebar/layout-tab/layout-tab.component';
import {ForceGraphSidebarComponent} from './force-graph-sidebar/force-graph-sidebar.component';
import {DecoratorTimePickerComponent} from './force-graph-sidebar/decorator-time-picker/decorator-time-picker.component';
import {DecoratorTimerComponent} from './force-graph-sidebar/decorator-timer/decorator-timer.component';
import {ForceGraphComponent} from './force-graph.component';
import {DecoratorReloadTimerService} from '../services/decorator-reload-timer.service';
import {DecoratorFilterService} from '../services/decorator-filter.service';
import {D3Service} from '../services/d3.service';
import {ContextMenuService} from '../services/context-menu.service';
import {GraphTopologyLoaderService} from '../services/graph-topology-loader.service';
import {DecoratorLoaderService} from '../services/decorator-loader.service';
import {DecoratorEventService} from '../services/decorator-event.service';
import {DecoratorTimeService} from '../services/decorator-time.service';
import {D3ZoomEventService} from '../services/d3-zoom-event.service';
import {GraphEventService} from '../services/graph-event.service';
import {GraphVisualComponentsModule} from '../visuals/graph-visual-components.module';
import {GraphRoutingModule} from './graph-routing.module';
import {GraphMaterialModule} from './graph-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GraphMaterialModule,
    GraphVisualComponentsModule,
    GraphRoutingModule
  ],
  declarations: [
    ForceGraphSidebarComponent,
    DecoratorFilterMenuComponent,
    ForceGraphComponent,
    DecoratorTimerComponent,
    LayoutTabComponent,
    DecoratorTimePickerComponent,
    AbsoluteTimeComponent,
    RelativeTimeComponent,
  ],
  providers: [
    D3Service,
    D3ZoomEventService,
    ContextMenuService,
    GraphTopologyLoaderService,
    DecoratorReloadTimerService,
    DecoratorLoaderService,
    DecoratorEventService,
    DecoratorFilterService,
    DecoratorTimeService,
    GraphEventService,
  ]
})
export class GraphModule {
}
