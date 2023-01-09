import { Injectable } from '@angular/core';
import { Link } from '../model/link/link';
import { HttpClient } from '@angular/common/http';
import {Node} from '../model/node/node';
import {NodePhysicalRoleEnum} from '../model/enums/node-physical-role-enum';
import {HostNode} from '../model/node/host-node';
import {RouterNode} from '../model/node/router-node';
import {LinkTypeEnum} from '../model/enums/link-type-enum';
import {Observable} from 'rxjs/Observable';

/**
 * Service for getting JSON data about topology of network and parsing them to model suitable for visualization
 * Creates hierarchical model inside nodes elements but returns it as flat array because hierarchical graph-visual are not supported
 * by D3 and it would cause problems. This way we can remain hierarchical structure inside model and
 * implement functions needed for visualization  in our own way.
 */

@Injectable()
export class GraphTopologyLoaderService {

  constructor(public http: HttpClient) {
  }

  /**
   * Sends HTTP request and parses data for topology model
   * @param {string} url where should be send GET request
   * @returns {Observable<{nodes: Node[], links: Link[]}>} Observable of topology model
   * Caller needs to subscribe for it.
   */
  getTopology(url: string): Observable<{nodes: Node[], links: Link[]}> {
    return this.http.get(url)
      .map(
        response => {
          return this.parseResponse(response);
        }
      );

  }

  /**
   * Parses provides JSON response and creates topology model usable in application
   * @param httpResponse JSON response describing the topology
   * @returns {{nodes: Node[], links: Link[]}} Created nodes and links which should be usable in applications graphs
   */
  private parseResponse(httpResponse): {nodes: Node[], links: Link[]} {
    const nodesStructured: Node[] = this.parseNodesRecursively(httpResponse);
    const nodes: Node[] = this.flattenNodes(nodesStructured);
    const links: Link[] = this.parseLinks(httpResponse, nodes);
    return {nodes, links};
  }


  /**
   *
   * @param jsonNodeData data describing topology
   * @returns {Node[]} structure of nodes parsed from json, empty array if no nodes are found
   */
  private parseNodesRecursively(jsonNodeData): Node[] {
    const nodes: Node[] = [];

    for (const node of jsonNodeData.children) {
      const role: NodePhysicalRoleEnum = NodePhysicalRoleEnum[this.getPhysicalRoleString(node.physical_role)];

      if (role === NodePhysicalRoleEnum.Cloud || role === NodePhysicalRoleEnum.Router) {
        nodes.push(new RouterNode(
          node.id,
          role,
          node.name,
          node.address4,
          node.address6,
          this.parseNodesRecursively(node))); // parse nodes children if there are any
      } else {
        nodes.push(new HostNode(
          node.id,
          role,
          node.name,
          node.address4,
          node.address6,
          node.host_node_id
        ));
      }
    }
    return nodes;
  }

  /**
   *
   * @param jsonLinksData data describing topology
   * @param nodes array of nodes used for connecting links with proper node objects
   * @returns {Link[]} structure of links parsed from json, empty array if no links are found
   */
  private parseLinks(jsonLinksData, nodes): Link[] {
    const links: Link[] = [];

    // create links between routers and hosts
    for (const link of jsonLinksData.links) {
      links.push(new Link(
        link.id,
        nodes.find(n => n.id === link.source_id),
        nodes.find(n => n.id === link.target_id),
        LinkTypeEnum.InterfaceOverlay));
    }
    // then create links between routers
    for (const routerLink of jsonLinksData.router_links) {
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
   * as flat array without any hierarchy because D3 graph-visual does not support such behaviour and it would cause problems.
   * @param {Node[]} nodes top-level nodes in hierarchy
   * @returns {Node[]} flattened array of nodes
   */
  private flattenNodes(nodes: Node[]): Node[] {
    const toReturn: Node[] = [];
    for (const node of nodes) {
      toReturn.push(node);

      if (node instanceof RouterNode) {
        this.flattenNodes(node.children).forEach(d => toReturn.push(d));
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
