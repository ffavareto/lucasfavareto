import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLink } from 'src/app/interfaces/profile-link';

@Component({
  selector: 'app-profile-links',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="buttons">
      <a
        class="libutton"
        href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=lucasfavaretosantos"
        target="_blank"
        >Me siga no LinkedIn
      </a>
    </div>
  `,
  styleUrl: './profile-links.component.scss',
})
export class ProfileLinksComponent {
  links = input.required<ProfileLink[]>();
}
