import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public carouselOne: NgxCarousel;
  imageUrls: string[] = [
    'assets/img/Galery/jean_14_6.jpg',
    'assets/img/Galery/matthieu_5_14.jpg',
    'assets/img/Galery/matthieu_7_25.jpg'
  ];
  height = '450px';
  minHeight: string;
  arrowSize = '30px';
  showArrows = false;
  disableSwiping = false;
  autoPlay = true;
  autoPlayInterval = 15000;
  stopAutoPlayOnSlide = true;
  debug = true;
  backgroundSize = 'contain';
  backgroundPosition = 'center center';
  backgroundRepeat = 'no-repeat';
  showDots = true;
  width = '100%';

  constructor() { }

  ngOnInit() {
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      // speed: 400,
      interval: 15000,
      point: {
        visible: true
      },
      load: 1,
      touch: true,
      loop: true,
      custom: 'banner'
    };
  }

  carouselLoad(event: Event) {

  }

}
