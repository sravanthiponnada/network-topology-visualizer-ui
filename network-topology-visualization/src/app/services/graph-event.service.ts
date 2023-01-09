import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {GraphEventTypeEnum} from '../model/enums/graph-event-type-enum';
import {Observable} from 'rxjs/Observable';
import {GraphEvent} from '../model/events/graph-event';
import {RouterNode} from '../model/node/router-node';
import {Node} from '../model/node/node';


/**
 * Service used for communication with graph-visual model and rearrangements from other parts of application
 */
@Injectable()
export class GraphEventService {

  private _graphEventSubject: Subject<GraphEvent> = new Subject();
  graphEvent: Observable<GraphEvent> = this._graphEventSubject.asObservable();

  /**
   * Sends an event to the graph to collapse all subnetworks
   */
  collapseAll() {
    this._graphEventSubject.next(new GraphEvent(GraphEventTypeEnum.CollapseAllSubnets));
  }

  /**
   * Sends an event to the graph to expand all subnetworks
   */
  expandAll() {
    this._graphEventSubject.next(new GraphEvent(GraphEventTypeEnum.ExpandAllSubnets));
  }

  /**
   * Sends an event to the graph to stick to hierarchical layout
   */
  hierarchicalLayout() {
    this._graphEventSubject.next(new GraphEvent(GraphEventTypeEnum.HierarchicalLayout));
  }

  /**
   * Sends an event to the graph to turn off the D3 forces.
   */
  turnOffForces() {
    this._graphEventSubject.next(new GraphEvent(GraphEventTypeEnum.TurnOffForces));
  }

  /**
   * Sends an event to the graph to hide the subnet of the node.
   */
  hideSubnet(node: RouterNode) {
    this._graphEventSubject.next(new GraphEvent(GraphEventTypeEnum.HideSubnet, node));
  }

  /**
   * Sends an event to the graph to reveal the subnet of the node.
   */
  revealSubnet(node: RouterNode) {
    this._graphEventSubject.next(new GraphEvent(GraphEventTypeEnum.RevealSubnet, node));
  }
}
