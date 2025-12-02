import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="global-loader" *ngIf="(loader.loading$ | async)">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
  `,
  styles: [`
    .global-loader {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 2000;
    }
  `]
})
export class LoaderIndicatorComponent {
  constructor(public loader: LoaderService) {}
}
