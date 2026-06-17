import { type PostMeta } from './post-meta';

export interface PostHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post {
  meta: PostMeta;
  html: string;
  headings: PostHeading[];
}
