import { About, AboutSection } from '../../models';

export function getAbout(pageData) {

    const about = new About();
    const aSec: Array<AboutSection> = [];

    about.descLabel = pageData.descLabel;
    about.description = pageData.description;
    about.subTitle = pageData.subTitle;
    about.title = pageData.title;
    pageData.sections.data.forEach(item => {
        const section = new AboutSection();
        section.id = item.id;
        section.label = item.label;
        section.text = item.text;
        aSec.push(section);
    });
    about.sections = aSec;
    return about;
}
