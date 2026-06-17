import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { TagListComponent } from '../../components/tag-list/tag-list.component';
import { PostMeta } from '../../interfaces/post-meta';

type LoadState = 'loading' | 'loaded' | 'error';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [PostCardComponent, TagListComponent],
  templateUrl: './blog-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);

  state = signal<LoadState>('loading');
  allPosts = signal<PostMeta[]>([]);
  activeTag = signal<string | null>(null);

  allTags = computed(() => {
    const seen = new Set<string>();
    const tags: string[] = [];
    for (const post of this.allPosts()) {
      for (const tag of post.tags) {
        if (!seen.has(tag)) {
          seen.add(tag);
          tags.push(tag);
        }
      }
    }
    return tags.sort();
  });

  filteredPosts = computed(() => {
    const tag = this.activeTag();
    if (!tag) return this.allPosts();
    return this.allPosts().filter(p =>
      p.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.activeTag.set(params.get('tag'));
    });

    this.blogService.getAllPosts().subscribe({
      next: posts => {
        this.allPosts.set(posts);
        this.state.set('loaded');
      },
      error: () => this.state.set('error'),
    });
  }
}
