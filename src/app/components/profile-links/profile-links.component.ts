import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileLink } from 'src/app/interfaces/profile-link';

@Component({
  selector: 'app-profile-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-links.component.html',
  styleUrl: './profile-links.component.scss',
})
export class ProfileLinksComponent {
  links = input.required<ProfileLink[]>();
}
