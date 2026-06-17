import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { type PostMeta } from '../../interfaces/post-meta';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './post-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  meta = input.required<PostMeta>();
}
