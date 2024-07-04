import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout',
  template: `
    <div class="h-screen mx-auto justify-center w-full">
      <div class="lg:py-20">
        <div class="flex items-center mx-auto h-full">
          <div class="w-full">
            <router-outlet />
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class LayoutComponent {}
