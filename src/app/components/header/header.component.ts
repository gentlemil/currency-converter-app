import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Dump component only for displaying a title and subtitle.
 */

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) subtitle!: string;
}
