import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  {
    path: 'graph',
    loadChildren: 'app/graph/graph.module#GraphModule' },
  {
    path: 'map',
    loadChildren: 'app/map-overlay/map.module#MapModule' },
  {
    path: '',
    redirectTo: '/graph',
    pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})

export class AppRoutingModule {

}
