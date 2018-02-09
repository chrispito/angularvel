import { IAboutSection } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class AboutSection implements IAboutSection {
  id?: number;
  label?: string;
  text?: string;
}
