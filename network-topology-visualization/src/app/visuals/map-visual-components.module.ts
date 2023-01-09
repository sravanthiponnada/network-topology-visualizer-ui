import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {MapVisualComponent} from './map-visual/map-visual.component';
import {MapLinkVisualComponent} from './map-link-visual/map-link-visual.component';
import {DirectivesModule} from '../directives/directives.module';
import {MapNodeVisualComponent} from './map-node-visual/map-node-visual.component';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';

@NgModule({
  imports: [
    CommonModule,
    AgmSnazzyInfoWindowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFvmnT0xi_QRHGfX8Qy7Eg2BuYKeSCz5s'
    })
  ],
  declarations: [
    MapVisualComponent,
    MapNodeVisualComponent,
    MapLinkVisualComponent,
  ],
  exports: [
    MapVisualComponent
  ]
})

export class MapVisualComponentsModule {}
