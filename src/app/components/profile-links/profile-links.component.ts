import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLink } from 'src/app/interfaces/profile-link';

@Component({
  selector: 'app-profile-links',
  standalone: true,
  imports: [CommonModule],
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
  styleUrl: './profile-links.component.scss',
})
export class ProfileLinksComponent {
  links = input.required<ProfileLink[]>();
}
