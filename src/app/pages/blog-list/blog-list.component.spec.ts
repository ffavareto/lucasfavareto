import { type ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { BlogListComponent } from './blog-list.component';
import { BlogService } from '../../services/blog.service';
import { type PostMeta } from '../../interfaces/post-meta';

const mockPosts: PostMeta[] = [
  {
    title: 'Post A',
    slug: 'post-a',
    date: '2026-06-17',
    description: 'Desc A.',
    tags: ['Angular', 'blog'],
    readingTime: 2,
  },
  {
    title: 'Post B',
    slug: 'post-b',
    date: '2026-06-10',
    description: 'Desc B.',
    tags: ['IA'],
    readingTime: 5,
  },
];

function createActivatedRoute(tag: string | null = null) {
  return {
    queryParamMap: of({ get: (key: string) => (key === 'tag' ? tag : null) }),
  };
}

describe('BlogListComponent', () => {
  let fixture: ComponentFixture<BlogListComponent>;
  let element: HTMLElement;

  async function setup(tag: string | null = null, posts = mockPosts, error = false) {
    await TestBed.configureTestingModule({
      imports: [BlogListComponent, RouterTestingModule],
      providers: [
        {
          provide: BlogService,
          useValue: {
            getAllPosts: () => (error ? throwError(() => new Error('fail')) : of(posts)),
          },
        },
        { provide: ActivatedRoute, useValue: createActivatedRoute(tag) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogListComponent);
    fixture.detectChanges();
    element = fixture.nativeElement;
  }

  it('should create', fakeAsync(async () => {
    await setup();
    tick();
    expect(fixture.componentInstance).toBeTruthy();
  }));

  it('should render a post card for each published post', fakeAsync(async () => {
    await setup();
    tick();
    fixture.detectChanges();
    const cards = element.querySelectorAll('app-post-card');
    expect(cards.length).toBe(2);
  }));

  it('should filter posts by tag', fakeAsync(async () => {
    await setup('Angular');
    tick();
    fixture.detectChanges();
    const cards = element.querySelectorAll('app-post-card');
    expect(cards.length).toBe(1);
  }));

  it('should show empty message when no posts match tag', fakeAsync(async () => {
    await setup('inexistente');
    tick();
    fixture.detectChanges();
    const message = element.querySelector('.blog-list__message');
    expect(message?.textContent).toContain('inexistente');
  }));

  it('should show error message on load failure', fakeAsync(async () => {
    await setup(null, [], true);
    tick();
    fixture.detectChanges();
    const message = element.querySelector('.blog-list__message--error');
    expect(message).toBeTruthy();
  }));
});
