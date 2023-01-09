import { NodePhysicalRoleEnum } from '../enums/node-physical-role-enum';
import {INode} from './inode';
/**
 * Abstract node used in graph-visual. Has attributes used for D3 simulation and SVG drawing (x,y, etc.)
 */
export abstract class Node implements INode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: number;
  physicalRole: NodePhysicalRoleEnum;
  name: string;
  address4: string;
  address6: string;
  constructor(id: number, physicalRole: NodePhysicalRoleEnum, name: string, address4: string, address6: string) {
    this.id = id;
    this.physicalRole = physicalRole;
    this.name = name;
    this.address4 = address4;
    this.address6 = address6;
  }

  public toString = (): string => {
    let result = 'Name: ' + this.name + '\n';

    if (this.address4) {
      result += 'IPv4 address: ' + this.address4 + '\n';
    }
    if (this.address6) {
      result += 'IPv6 address: ' +  this.address6 + '\n';
    }

    result += 'Physical role: ' + this.physicalRole + '\n' + 'Id: ' + this.id + '\n';
    return result;
  }
}
