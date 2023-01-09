import { Component, OnInit } from '@angular/core';
import {Link} from '../model/link/link';
import {MapTopologyLoaderService} from '../services/map-topology-loader.service';
import {environment} from '../../environments/environment';
import {GeoNode} from '../model/node/geo-node';

/**
 * Main component of map overlay. Gets nodes and links from map topology service and creates map components
 */
@Component({
  selector: 'app-map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.css']
})
export class MapOverlayComponent implements OnInit {

  nodes: GeoNode[];
  links: Link[];
  loadedTopology: boolean;

  constructor(private mapLoader: MapTopologyLoaderService) { }

  ngOnInit() {
    this.loadedTopology = false;
    this.loadTopology();
  }

  loadTopology() {
    this.mapLoader.getTopology(environment.mapTopologyRestUrl)
      .subscribe(
        response => {
          this.nodes = response.nodes;
          this.links = response.links;
          this.loadedTopology = true;
        },
      err => console.log(err),
      );
  }
}

