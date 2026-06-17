import {
  Component,
  type OnInit,
  type OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { type Post } from '../../interfaces/post';

type LoadState = 'loading' | 'loaded' | 'error';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  state = signal<LoadState>('loading');
  post = signal<Post | null>(null);

  private originalTitle = this.titleService.getTitle();

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.blogService.getPostBySlug(slug).subscribe({
      next: (post) => {
        this.post.set(post);
        this.state.set('loaded');
        this.titleService.setTitle(`${post.meta.title} — Lucas Favareto`);
        this.metaService.updateTag({ name: 'description', content: post.meta.description });
      },
      error: (err) => {
        if (err.status === 404) {
          this.router.navigate(['/not-found']);
          return;
        }
        this.state.set('error');
      },
    });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(this.originalTitle);
    this.metaService.updateTag({ name: 'description', content: '' });
  }
}
