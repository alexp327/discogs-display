import { Release } from './release';

export interface DiscogsApiResponse {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: {
      first?: string;
      last?: string;
      prev?: string;
      next?: string;
    };
  };
  releases: Release[];
}

