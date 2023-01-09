import {NodePhysicalRoleEnum} from '../enums/node-physical-role-enum';
import {Geo} from '../others/geo';
import {IGeoNode} from './igeo-node';

export abstract class GeoNode implements IGeoNode {

  id: number;
  physicalRole: NodePhysicalRoleEnum;
  name: string;
  address4: string;
  address6: string;
  geo: Geo;

  constructor(id: number, physicalRole: NodePhysicalRoleEnum, name: string, address4: string, address6: string, geo: Geo) {
    this.id = id;
    this.physicalRole = physicalRole;
    this.name = name;
    this.address4 = address4;
    this.address6 = address6;
    this.geo = geo;
  }
}
