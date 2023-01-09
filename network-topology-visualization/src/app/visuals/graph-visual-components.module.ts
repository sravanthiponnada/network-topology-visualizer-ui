import { NgModule } from '@angular/core';
import { NodeContextMenuComponent } from './graph-node-context-menu/graph-node-context-menu.component';
import { GraphVisualComponent } from './graph-visual/graph-visual.component';
import { GraphLinkVisualComponent } from './graph-link-visual/graph-link-visual.component';
import { GraphNodeVisualComponent } from './graph-node-visual/graph-node-visual.component';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../directives/directives.module';
import {NodeVisualSemaphoreDecoratorComponent} from './graph-node-visual/graph-node-visual-decorators/node-visual-semaphore-decorator/node-visual-semaphore-decorator.component';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule
  ],
  declarations: [
    NodeContextMenuComponent,
    GraphVisualComponent,
    GraphLinkVisualComponent,
    GraphNodeVisualComponent,
    NodeVisualSemaphoreDecoratorComponent,

  ],
  exports: [
    GraphVisualComponent
  ]
})

export class GraphVisualComponentsModule {}
