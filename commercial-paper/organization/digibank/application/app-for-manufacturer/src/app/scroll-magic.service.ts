import { Injectable } from '@angular/core';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'imports-loader?define=>false!scrollmagic';

@Injectable({
  providedIn: 'root'
})
export class ScrollMagicService {

  public ScrollMagic : any;
  public controller :any;

  constructor() {
    // this.ScrollMagic = require("scrollmagic");
    // require("scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap");
    this.controller = new this.ScrollMagic.Controller();
   }
}
