import {RouterModule, Routes} from '@angular/router';
import {MapOverlayComponent} from './map-overlay.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MapOverlayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
