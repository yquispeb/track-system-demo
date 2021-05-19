import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio-component.component.html',
  styleUrls: ['./inicio-component.component.css']
})
export class InicioComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  imagesPath0 = '/assets/openphotonet_MAJ_8672.jpg';
  imagesPath1 = '/assets/openphotonet_IMG_6831.JPG';
  imagesPath2 = '/assets/2002_3_20_176_0_OPL.jpg';
}
