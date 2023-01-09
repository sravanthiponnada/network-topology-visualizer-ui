/**
 * Host node
 */
import { Node } from './node';

export class HostNode extends Node {

  hostId: number;

  constructor(id, type, name, address4, address6, hostId) {
    super(id, type, name, address4, address6);
    this.hostId = hostId;
  }
}
