import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import { ProfileLink } from '../../interfaces/profile-link';

@Component({
  selector: 'app-profile-links',
  standalone: true,
  imports: [],
  template: `
    <ul class="profile-links" aria-label="Links de perfil">
      @for (link of links(); track link.title) {
        <li>
          <a
            [href]="link.url"
            [attr.aria-label]="'Perfil no ' + link.title"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.title }}
          </a>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './profile-links.component.scss',
})
export class ProfileLinksComponent {
  links = input.required<ProfileLink[]>();
}
