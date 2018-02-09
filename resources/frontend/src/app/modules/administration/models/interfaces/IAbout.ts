import { IAboutSection } from './IAboutSection';

export interface IAbout {
  id?: number;
  title?: string;
  subTitle?: string;
  descLabel?: string;
  description?: string;
  sections?: IAboutSection[];
}
