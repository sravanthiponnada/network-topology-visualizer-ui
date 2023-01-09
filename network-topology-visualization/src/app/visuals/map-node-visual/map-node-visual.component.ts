import {Component, Input, OnInit} from '@angular/core';
import {GeoNode} from '../../model/node/geo-node';

@Component({
  selector: 'map-node-visual',
  templateUrl: './map-node-visual.component.html',
  styleUrls: ['./map-node-visual.component.css']
})
export class MapNodeVisualComponent implements OnInit {

  @Input('node') node: GeoNode;

  constructor() { }

  ngOnInit() {
  }
}
