import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { BlogPostComponent } from './blog-post.component';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../interfaces/post';

const mockPost: Post = {
  meta: {
    title: 'Post de teste',
    slug: 'post-de-teste',
    date: '2026-06-17',
    description: 'Descrição de teste.',
    tags: ['Angular'],
    readingTime: 3,
  },
  html: '<p>Conteúdo do post.</p>',
  headings: [{ id: 'secao', text: 'Seção', level: 2 }],
};

function createActivatedRoute(slug = 'post-de-teste') {
  return {
    snapshot: { paramMap: convertToParamMap({ slug }) },
  };
}

describe('BlogPostComponent', () => {
  let fixture: ComponentFixture<BlogPostComponent>;
  let element: HTMLElement;

  async function setup(postResult: Post | null = mockPost, errorStatus?: number) {
    const blogServiceMock = {
      getPostBySlug: () =>
        errorStatus
          ? throwError(() => ({ status: errorStatus }))
          : of(postResult),
    };

    await TestBed.configureTestingModule({
      imports: [BlogPostComponent, RouterTestingModule],
      providers: [
        { provide: BlogService, useValue: blogServiceMock },
        { provide: ActivatedRoute, useValue: createActivatedRoute() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPostComponent);
    fixture.detectChanges();
    element = fixture.nativeElement;
  }

  it('should create', fakeAsync(async () => {
    await setup();
    tick();
    expect(fixture.componentInstance).toBeTruthy();
  }));

  it('should render post title', fakeAsync(async () => {
    await setup();
    tick();
    fixture.detectChanges();
    const title = element.querySelector('.blog-post__title');
    expect(title?.textContent?.trim()).toBe('Post de teste');
  }));

  it('should render post html body', fakeAsync(async () => {
    await setup();
    tick();
    fixture.detectChanges();
    const body = element.querySelector('.blog-post__body');
    expect(body?.innerHTML).toContain('<p>Conteúdo do post.</p>');
  }));

  it('should render table of contents when headings exist', fakeAsync(async () => {
    await setup();
    tick();
    fixture.detectChanges();
    const toc = element.querySelector('.blog-post__toc');
    expect(toc).toBeTruthy();
  }));

  it('should show error message on non-404 error', fakeAsync(async () => {
    await setup(null, 500);
    tick();
    fixture.detectChanges();
    const error = element.querySelector('.blog-post__message--error');
    expect(error).toBeTruthy();
  }));
});
