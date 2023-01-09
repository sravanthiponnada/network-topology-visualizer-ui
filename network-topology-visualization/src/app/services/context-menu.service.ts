import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Service used for handling mouse events after right click.
 */

@Injectable()
export class ContextMenuService {

  public show: Subject<{event: MouseEvent, obj: any[]}> = new Subject();
}
