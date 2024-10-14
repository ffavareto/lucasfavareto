import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumExperienceComponent } from './curriculum-experience.component';

describe('CurriculumExperienceComponent', () => {
  let component: CurriculumExperienceComponent;
  let fixture: ComponentFixture<CurriculumExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
