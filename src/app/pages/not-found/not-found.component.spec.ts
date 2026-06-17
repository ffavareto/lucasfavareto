import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the not found title', () => {
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('.not-found__title');
    expect(title?.textContent?.trim()).toBe('Página não encontrada');
  });

  it('should have links to home and blog', () => {
    const el: HTMLElement = fixture.nativeElement;
    const links = el.querySelectorAll<HTMLAnchorElement>('.not-found__link');
    const hrefs = Array.from(links).map(l => l.getAttribute('href'));
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/blog');
  });
});
