import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumSkillsComponent } from './curriculum-skills.component';

describe('CurriculumSkillsComponent', () => {
  let component: CurriculumSkillsComponent;
  let fixture: ComponentFixture<CurriculumSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumSkillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
