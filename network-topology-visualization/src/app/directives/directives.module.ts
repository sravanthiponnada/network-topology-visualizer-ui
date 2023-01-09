import { NgModule } from '@angular/core';
import { ContextMenuDirective } from './context-menu.directive';
import { DraggableDirective } from './draggable.directive';
import { ZoomableDirective } from './zoomable.directive';

@NgModule({
  declarations: [
    ContextMenuDirective,
    DraggableDirective,
    ZoomableDirective
  ],
  exports: [
    ContextMenuDirective,
    DraggableDirective,
    ZoomableDirective
  ]
})

export class DirectivesModule {}
