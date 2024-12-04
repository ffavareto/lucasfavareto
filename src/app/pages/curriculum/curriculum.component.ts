import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumExperienceComponent } from '../../components/curriculum-experience/curriculum-experience.component';
import { CurriculumAboutComponent } from '../../components/curriculum-about/curriculum-about.component';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [
    CommonModule,
    CurriculumExperienceComponent,
    CurriculumAboutComponent,
  ],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.scss',
})
export class CurriculumComponent {}
