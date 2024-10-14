import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumAboutComponent } from './curriculum-about.component';

describe('CurriculumAboutComponent', () => {
  let component: CurriculumAboutComponent;
  let fixture: ComponentFixture<CurriculumAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumAboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
