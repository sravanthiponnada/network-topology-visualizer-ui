import { Node } from '../node/node';
import { LinkTypeEnum } from '../enums/link-type-enum';

/**
 * Link between two nodes in a graph-visual. Has id, source and target, type,
 * reference to duplicate link(opposite way) and set of decorators
 */
export class Link implements d3.SimulationLinkDatum<Node> {

  id: number;
  source: Node;
  target: Node;
  type: LinkTypeEnum;

  constructor(id: number, source: Node, target: Node, type: LinkTypeEnum) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.type = type;
  }

}
