import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tag-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  tags = input.required<string[]>();
  activeTag = input<string | null>(null);
}
