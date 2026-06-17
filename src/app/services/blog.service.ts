import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type Observable } from 'rxjs';
import { type PostMeta } from '../interfaces/post-meta';
import { type Post } from '../interfaces/post';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  getAllPosts(): Observable<PostMeta[]> {
    return this.http.get<PostMeta[]>('/assets/blog/posts.json');
  }

  getPostBySlug(slug: string): Observable<Post> {
    return this.http.get<Post>(`/assets/blog/content/${slug}.json`);
  }
}
