import { AboutSection } from '../models/about_section_page.model';

export interface About {
  id?: number;
  title?: string;
  subTitle?: string;
  descLabel?: string;
  description?: string;
  sections?: AboutSection[];
}
