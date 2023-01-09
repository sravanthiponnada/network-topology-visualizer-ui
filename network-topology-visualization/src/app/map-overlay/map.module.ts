import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapOverlayComponent} from './map-overlay.component';
import {MapTopologyLoaderService} from '../services/map-topology-loader.service';
import {MapVisualComponentsModule} from '../visuals/map-visual-components.module';
import {MapRoutingModule} from './map-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MapVisualComponentsModule,
    MapRoutingModule
  ],
  declarations: [
    MapOverlayComponent
  ],
  providers: [
    MapTopologyLoaderService
  ]
})
export class MapModule { }
