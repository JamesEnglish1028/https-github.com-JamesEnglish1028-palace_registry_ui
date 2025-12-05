export interface Link {
  href: string;
  rel: string;
  type?: string;
}

export interface Metadata {
  id: string;
  title: string;
  updated?: string;
  description?: string;
}

export interface Catalog {
  metadata: Metadata;
  links: Link[];
  images?: Link[];
  href?: string; // Sometimes provided directly
}

export interface RegistryResponse {
  catalogs: Catalog[];
}

export interface LibraryDisplay {
  id: string;
  name: string;
  description: string;
  link: string;
  logoUrl?: string;
  catalogUrl?: string;
  state?: string;
}