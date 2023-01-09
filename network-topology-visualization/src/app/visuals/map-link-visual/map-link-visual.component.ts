import {Component, Input, OnInit} from '@angular/core';
import {Link} from '../../model/link/link';
import {Geo} from '../../model/others/geo';
import {GeoNode} from '../../model/node/geo-node';

@Component({
  selector: 'map-link-visual',
  templateUrl: './map-link-visual.component.html',
  styleUrls: ['./map-link-visual.component.css']
})
export class MapLinkVisualComponent implements OnInit {

  sourceGeo: Geo;
  targetGeo: Geo;
  @Input('link') link: Link;
  constructor() { }

  ngOnInit() {
    this.sourceGeo = (this.link.source as GeoNode).geo;
    this.targetGeo = (this.link.target as GeoNode).geo;
  }

}
