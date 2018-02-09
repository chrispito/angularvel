import { IAbout } from './interfaces';
import { Injectable } from '@angular/core';
import { AboutSection } from './index';

@Injectable()
export class About implements IAbout {

  id?: number;
  title?: string;
  subTitle?: string;
  descLabel?: string;
  description?: string;
  sections?: AboutSection[];

}
