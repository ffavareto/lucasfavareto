import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostCardComponent } from './post-card.component';
import { PostMeta } from '../../interfaces/post-meta';

const mockMeta: PostMeta = {
  title: 'Post de teste',
  slug: 'post-de-teste',
  date: '2026-06-17',
  description: 'Descrição do post de teste.',
  tags: ['Angular', 'blog'],
  readingTime: 3,
};

describe('PostCardComponent', () => {
  let fixture: ComponentFixture<PostCardComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCardComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCardComponent);
    fixture.componentRef.setInput('meta', mockMeta);
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the post title', () => {
    const title = element.querySelector('.post-card__title');
    expect(title?.textContent?.trim()).toBe('Post de teste');
  });

  it('should render the post description', () => {
    const description = element.querySelector('.post-card__description');
    expect(description?.textContent?.trim()).toBe('Descrição do post de teste.');
  });

  it('should render a link to the post', () => {
    const link = element.querySelector<HTMLAnchorElement>('.post-card__link');
    expect(link?.getAttribute('href')).toBe('/blog/post-de-teste');
  });

  it('should render tags', () => {
    const tags = element.querySelectorAll('.post-card__tag');
    expect(tags.length).toBe(2);
    expect(tags[0].textContent?.trim()).toBe('Angular');
    expect(tags[1].textContent?.trim()).toBe('blog');
  });

  it('should render reading time', () => {
    const meta = element.querySelector('.post-card__reading-time');
    expect(meta?.textContent).toContain('3 min');
  });
});
