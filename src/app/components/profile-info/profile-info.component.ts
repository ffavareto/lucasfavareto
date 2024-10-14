import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ArrowSVGComponent } from '../arrow-svg/arrow-svg.component';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ArrowSVGComponent],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent {}
