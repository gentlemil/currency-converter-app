import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class DashboardComponent {
  title = 'Currency Converter';
  subtitle = 'Check current exchange rates.';
}
