import { Injectable } from '@angular/core';
import { Link } from '../model/link/link';
import { HttpClient } from '@angular/common/http';
import {Node} from '../model/node/node';
import {NodePhysicalRoleEnum} from '../model/enums/node-physical-role-enum';
import {LinkTypeEnum} from '../model/enums/link-type-enum';
import {Observable} from 'rxjs/Observable';
import {GeoRouterNode} from '../model/node/geo-router-node';
import {Geo} from '../model/others/geo';
import {GeoHostNode} from '../model/node/geo-host-node';
import {GeoNode} from '../model/node/geo-node';

/**
 * Service for getting JSON data about topology of network and parsing them to model suitable for visualization
 * Creates hierarchical model inside nodes elements but returns it as flat array because its easily visualized with google map
 * Hierarchical model remains in the model.
 */

@Injectable()
export class MapTopologyLoaderService {

  constructor(public http: HttpClient) {
  }

  /**
   * Sends HTTP request and parses data for topology model
   * @param {string} url where should be send GET request
   * @returns {Observable<{nodes: Node[], links: Link[]}>} Observable of topology model
   * Caller needs to subscribe for it.
   */
  getTopology(url: string): Observable<{nodes: GeoNode[], links: Link[]}> {
    return this.http.get(url)
      .map(
        httpResponse => {
          return this.parseResponse(httpResponse);
        }
      );
  }

  /**
   * Parses provides JSON response and creates topology model usable in application
   * @param httpResponse JSON response describing the topology
   * @returns {{nodes: Node[], links: Link[]}} Created nodes and links which should be usable in applications graphs
   */
  private parseResponse(httpResponse): {nodes: GeoNode[], links: Link[]} {
    const nodesStructured: GeoNode[] = this.parseNodesRecursively(httpResponse);
    const nodes: GeoNode[] = this.flattenNodes(nodesStructured);
    const links: Link[] = this.parseLinks(httpResponse, nodes);

    return {nodes, links};
  }

  /**
   *
   * @param jsonNodeData data describing topology
   * @returns {Node[]} structure of nodes parsed from json, empty array if no nodes are found
   */
  private parseNodesRecursively(jsonNodeData): GeoNode[] {
    const nodes: GeoNode[] = [];

    for (const node of jsonNodeData.children) {
      const role: NodePhysicalRoleEnum = NodePhysicalRoleEnum[this.getPhysicalRoleString(node.physical_role)];
      const geo = new Geo(node.geo.latitude, node.geo.longitude);

      if (role === NodePhysicalRoleEnum.Cloud || role === NodePhysicalRoleEnum.Router) {
        nodes.push(new GeoRouterNode(
          node.id,
          role,
          node.name,
          node.address4,
          node.address6,
          geo,
          this.parseNodesRecursively(node))); // parse nodes children if there are any
      } else {
        nodes.push(new GeoHostNode(
          node.id,
          role,
          node.name,
          node.address4,
          node.address6,
          geo
        ));
      }
    }
    return nodes;
  }

  /**
   *
   * @param JsonLinkData data describing topology
   * @param nodes array of nodes to properly connect node objects with links
   * @returns {Link[]} structure of links parsed from json, empty array if no links are found
   */
  private parseLinks(JsonLinkData, nodes: Node[]): Link[] {
    const links: Link[] = [];

    // create links between routers and hosts
    for (const link of JsonLinkData.links) {
      links.push(new Link(
        link.id,
        nodes.find(n => n.id === link.source_id),
        nodes.find(n => n.id === link.target_id),
        LinkTypeEnum.InterfaceOverlay));
    }
    // then create links between routers
    for (const routerLink of JsonLinkData.router_links) {
      links.push(new Link(
        routerLink.id,
        nodes.find(n => n.id === routerLink.source_id),
        nodes.find(n => n.id === routerLink.target_id),
        LinkTypeEnum.InternetworkingOverlay));
    }
    return links;
  }

  /**
   *This method is used to maintain hierarchical structure between nodes in our model but return it to the caller
   * as flat array without any hierarchy because its easier to use for visualization purposes.
   * @param {Node[]} nodes top-level nodes in hierarchy
   * @returns {Node[]} flattened array of nodes
   */
  private flattenNodes(nodes: GeoNode[]): GeoNode[] {
    const toReturn: GeoNode[] = [];
    for (const node of nodes) {
      toReturn.push(node);

      if (node instanceof GeoRouterNode) {
        const children = node.children as GeoNode[];
        this.flattenNodes(children).forEach(d => toReturn.push(d));
      }
    }
    return toReturn;
  }

  /**
   * Helper method to transfer physical string to match PascalCase Enum
   * @param {string} role
   * @returns {string}
   */
  private getPhysicalRoleString(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

}
