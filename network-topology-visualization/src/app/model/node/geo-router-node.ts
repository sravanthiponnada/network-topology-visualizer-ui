import {NodePhysicalRoleEnum} from '../enums/node-physical-role-enum';
import {Geo} from '../others/geo';
import {GeoNode} from './geo-node';

export class GeoRouterNode extends GeoNode {

  children: GeoNode[];

  constructor(id: number,
              physicalRole: NodePhysicalRoleEnum,
              name: string,
              address4: string,
              address6: string,
              geo: Geo,
              children: GeoNode[]) {
    super(id, physicalRole, name, address4, address6, geo);
    this.children = children;
  }
}
