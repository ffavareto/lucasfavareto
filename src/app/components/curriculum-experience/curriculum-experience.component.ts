import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curriculum-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum-experience.component.html',
  styleUrl: './curriculum-experience.component.scss',
})
export class CurriculumExperienceComponent {
  currentJobDuration = this.calcDuration(new Date(2025, 4, 1), new Date());

  totalExperience = this.calcTotalExperience([
    { start: new Date(2019, 10, 1), end: new Date(2022, 7, 1) },
    { start: new Date(2022, 8, 1), end: new Date(2025, 4, 1) },
    { start: new Date(2025, 4, 1), end: new Date() },
  ]);

  private calcDuration(start: Date, end: Date): string {
    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    if (months < 1) {
      return 'menos de 1 mês';
    }

    const years = Math.floor(months / 12);
    months = months % 12;

    const parts: string[] = [];
    if (years === 1) parts.push('1 ano');
    else if (years > 1) parts.push(`${years} anos`);
    if (months === 1) parts.push('1 mês');
    else if (months > 1) parts.push(`${months} meses`);

    return parts.join(' e ');
  }

  private calcTotalExperience(
    periods: { start: Date; end: Date }[]
  ): string {
    const totalMonths = periods.reduce(
      (sum, p) =>
        sum +
        (p.end.getFullYear() - p.start.getFullYear()) * 12 +
        (p.end.getMonth() - p.start.getMonth()),
      0
    );

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const parts: string[] = [];
    if (years === 1) parts.push('1 ano');
    else if (years > 1) parts.push(`${years} anos`);
    if (months === 1) parts.push('1 mês');
    else if (months > 1) parts.push(`${months} meses`);

    return parts.join(' e ');
  }
}
