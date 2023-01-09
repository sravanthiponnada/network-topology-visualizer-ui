import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Link} from '../../model/link/link';
import {GoogleMap} from '../../model/map/google-map';
import {GeoNode} from '../../model/node/geo-node';
import {MapTypeStyle} from '@agm/core';


/**
 * Visual component of map. Uses AGM library and its components
 * Creates map model and nodes and links visual components
 */
@Component({
  selector: 'google-map',
  templateUrl: './map-visual.component.html',
  styleUrls: ['./map-visual.component.css']
})
export class MapVisualComponent implements OnInit {

  @Input('nodes') nodes: GeoNode[];
  @Input('links') links: Link[];

  googleMap: GoogleMap;

  // Google map style objects. Passed to google map to customize visual aspects of map
  mapStyles: MapTypeStyle[];

  width: number;
  height: number;
  // initial coordinates of map
  initLat: number;
  initLng: number;
  // initial zoom of map
  zoom: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth - 20;
    this.height = window.innerHeight - 20;
  }

  constructor() { }

  ngOnInit() {
    this.googleMap = new GoogleMap(this.nodes, this.links);
    this.width = window.innerWidth - 20;
    this.height = window.innerHeight - 20;

    const midpoint = this.googleMap.findMidpoint();
    this.initLat = midpoint.latitude;
    this.initLng = midpoint.longitude;
    this.zoom = 13;

    this.mapStyles = this.createMapStyles();
    }

  /**
   * Creates map styles. Disables POIs (point of interest) and transit markers (bus stops etc)
   * @returns {MapTypeStyle[]} GoogleMap types object
   */
  private  createMapStyles(): MapTypeStyle[] {
    return [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          {visibility: 'off'}
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [
          {visibility: 'off'}]
      }
    ];
  }

}
