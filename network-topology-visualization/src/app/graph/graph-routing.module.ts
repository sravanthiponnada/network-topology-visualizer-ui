import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ForceGraphComponent} from './force-graph.component';

const routes: Routes = [
  {
    path: '',
    component: ForceGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphRoutingModule { }
