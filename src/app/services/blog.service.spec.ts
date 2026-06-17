import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BlogService } from './blog.service';
import { PostMeta } from '../interfaces/post-meta';
import { Post } from '../interfaces/post';

const mockMeta: PostMeta = {
  title: 'Post de teste',
  slug: 'post-de-teste',
  date: '2026-06-17',
  description: 'Descrição de teste.',
  tags: ['Angular'],
  readingTime: 2,
};

const mockPost: Post = {
  meta: mockMeta,
  html: '<p>Conteúdo do post.</p>',
  headings: [{ id: 'secao', text: 'Seção', level: 2 }],
};

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllPosts should return list of post meta', () => {
    let result: PostMeta[] | undefined;
    service.getAllPosts().subscribe(posts => (result = posts));

    const req = httpMock.expectOne('/assets/blog/posts.json');
    expect(req.request.method).toBe('GET');
    req.flush([mockMeta]);

    expect(result).toEqual([mockMeta]);
  });

  it('getPostBySlug should return post by slug', () => {
    let result: Post | undefined;
    service.getPostBySlug('post-de-teste').subscribe(post => (result = post));

    const req = httpMock.expectOne('/assets/blog/content/post-de-teste.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);

    expect(result).toEqual(mockPost);
  });

  it('getPostBySlug should propagate 404 error', () => {
    let errorStatus: number | undefined;
    service.getPostBySlug('inexistente').subscribe({
      error: err => (errorStatus = err.status),
    });

    const req = httpMock.expectOne('/assets/blog/content/inexistente.json');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });

    expect(errorStatus).toBe(404);
  });
});
