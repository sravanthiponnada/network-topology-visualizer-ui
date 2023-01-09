import {Geo} from '../others/geo';
import {NodePhysicalRoleEnum} from '../enums/node-physical-role-enum';
import {GeoNode} from './geo-node';

export class GeoHostNode extends GeoNode {

  constructor(id: number, type: NodePhysicalRoleEnum, name: string, address4: string, address6: string, geo: Geo) {
    super(id, type, name, address4, address6, geo);
  }
}
