import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileLinksComponent } from './profile-links.component';

describe('ProfileLinksComponent', () => {
  let component: ProfileLinksComponent;
  let fixture: ComponentFixture<ProfileLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileLinksComponent);
    fixture.componentRef.setInput('links', [
      { title: 'GitHub', url: 'https://github.com/ffavareto' },
      { title: 'LinkedIn', url: 'https://www.linkedin.com/in/lucasfavaretosantos/' },
    ]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render links list', () => {
    const element: HTMLElement = fixture.nativeElement;
    const links = element.querySelectorAll('a');

    expect(links.length).toBe(2);
    expect(links[0].textContent?.trim()).toBe('GitHub');
    expect(links[1].textContent?.trim()).toBe('LinkedIn');
  });
});
