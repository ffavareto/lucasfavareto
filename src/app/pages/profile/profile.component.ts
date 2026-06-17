import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ProfileInfoComponent } from '../../components/profile-info/profile-info.component';
import { ProfileLinksComponent } from '../../components/profile-links/profile-links.component';
import { CurriculumAboutComponent } from '../../components/curriculum-about/curriculum-about.component';
import { CurriculumExperienceComponent } from '../../components/curriculum-experience/curriculum-experience.component';
import { HardSkillsComponent } from '../../components/hard-skills/hard-skills.component';
import { type ProfileLink } from '../../interfaces/profile-link';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileInfoComponent,
    ProfileLinksComponent,
    CurriculumAboutComponent,
    CurriculumExperienceComponent,
    HardSkillsComponent,
  ],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  links: ProfileLink[] = [
    {
      title: 'github.com/ffavareto',
      url: 'https://github.com/ffavareto',
    },
    {
      title: 'in/lucasfavaretosantos',
      url: 'https://www.linkedin.com/in/lucasfavaretosantos/',
    },
    {
      title: 'lucasfavaretosantos98@gmail.com',
      url: 'mailto:lucasfavaretosantos98@gmail.com',
    },
  ];
}
