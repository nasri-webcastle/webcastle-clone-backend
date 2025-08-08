import type { Schema, Struct } from '@strapi/strapi';

export interface AwardAwards extends Struct.ComponentSchema {
  collectionName: 'components_award_awards';
  info: {
    displayName: 'Awards';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface CtaCtaItem extends Struct.ComponentSchema {
  collectionName: 'components_cta_cta_items';
  info: {
    displayName: 'cta-item';
  };
  attributes: {
    buttonlabel: Schema.Attribute.String;
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface LinksLinks extends Struct.ComponentSchema {
  collectionName: 'components_links_links';
  info: {
    displayName: 'links';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface TechIconsTechIcons extends Struct.ComponentSchema {
  collectionName: 'components_tech_icons_tech_icons';
  info: {
    displayName: 'techIcons';
  };
  attributes: {
    reactIcon: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'award.awards': AwardAwards;
      'cta.cta-item': CtaCtaItem;
      'links.links': LinksLinks;
      'tech-icons.tech-icons': TechIconsTechIcons;
    }
  }
}
