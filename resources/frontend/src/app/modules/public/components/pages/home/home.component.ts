import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageUrls: string[] = [
    'assets/img/Galery/arto-marttinen-117445-unsplash.jpg',
    'assets/img/Galery/tim-swaan-45717-unsplash.jpg',
    'assets/img/Galery/sebastian-unrau-41230-unsplash.jpg',
    'assets/img/Galery/darius-soodmand-116253-unsplash.jpg'
  ];
  height = '450px';
  minHeight: string;
  arrowSize = '30px';
  showArrows = false;
  disableSwiping = false;
  autoPlay = true;
  autoPlayInterval = 5000;
  stopAutoPlayOnSlide = true;
  debug = true;
  backgroundSize = 'cover';
  backgroundPosition = 'center center';
  backgroundRepeat = 'no-repeat';
  showDots = true;
  width = '100%';

  constructor() { }

  ngOnInit() {
  }

}
