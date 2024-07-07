import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class HeaderComponent {
  title = 'Currency Converter';
  subtitle = 'Check current exchange rates.';
}
