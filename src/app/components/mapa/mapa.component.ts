import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa', { static: true }) mapa: any;

  constructor() { }

  ngOnInit() {
    if (this.coords) {      
      const latLng = this.coords.split(',');
      const lat = latLng[0];
      const lng = latLng[1];
  
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXJnM25pNSIsImEiOiJja2ZtNHJ6Z2oxZmZzMnJsZHZmYTFteTAxIn0.1rKJFNCPQSYtWT0epv0euQ';    
      const map = new mapboxgl.Map({
        container: this.mapa.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 15
      });
      const marker = new mapboxgl.Marker().setLngLat({ lng, lat }).addTo(map);
    }
  }
}
