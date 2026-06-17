import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostMeta } from '../interfaces/post-meta';
import { Post } from '../interfaces/post';

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
