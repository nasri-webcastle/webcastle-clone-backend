import type { Schema, Struct } from '@strapi/strapi';

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

export interface TechnologiesTechnologies extends Struct.ComponentSchema {
  collectionName: 'components_technologies_technologies';
  info: {
    displayName: 'Technologies';
  };
  attributes: {
    icon: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'links.links': LinksLinks;
      'tech-icons.tech-icons': TechIconsTechIcons;
      'technologies.technologies': TechnologiesTechnologies;
    }
  }
}
