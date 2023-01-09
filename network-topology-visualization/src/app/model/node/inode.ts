import {NodePhysicalRoleEnum} from '../enums/node-physical-role-enum';
import {SimulationNodeDatum} from 'd3';

export interface INode extends SimulationNodeDatum {
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

}
