import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../../services/app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrentExchangeRatesComponent } from '../../components/currentExchangeRates/currentExchangeRates.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CalculatorComponent } from '../../components/calculator/calculator.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    CurrentExchangeRatesComponent,
    CalculatorComponent,
  ],
})
export class DashboardComponent {
  isLoading$ = this.appService.isLoading$;

  constructor(private readonly appService: AppService) {}
}
