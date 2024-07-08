# CurrencyConverterApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Description - Interview Task

"Zadaniem jest stworzenie prostej aplikacji do przeliczania walut

1. Pobieranie danych: Aplikacja powinna pobierać dane o kursach walut z API Narodowego Banku Polskiego (NBP API).
2. Wyświetlanie kursów walut: Na stronie głównej powinny być wyświetlane aktualne kursy walut z możliwością wyboru daty waluty.
3. Przeliczanie walut: Użytkownik powinien mieć możliwość przeliczenia kwoty z jednej waluty na drugą. Do tego celu powinien być dostępny formularz, w którym użytkownik może wprowadzić kwotę i wybrać waluty.
4. Responsywność: Aplikacja powinna być responsywna i dobrze wyglądać na różnych urządzeniach.
5. Dostępność: Aplikacja powinna spełniać standardy WCAG 2.1.
6. Stylowanie: Użyj CSS do stworzenia atrakcyjnego i czytelnego interfejsu użytkownika. Zadanie proszę wykonać w Angularze"."

## URL:

## API Connection

Na potrzeby tego zadania, połączyłem swoją aplikację z zewnętrznym API udostępnionym przez [NBP (Narodowy Bank Polski)](https://api.nbp.pl). Korzystam z trzech endpointów:

1. http://api.nbp.pl/api/exchangerates/tables/{table}/
2. http://api.nbp.pl/api/exchangerates/rates/{table}/{code}/today`
3. http://api.nbp.pl/api/exchangerates/rates/{table}/{code}
4. http://api.nbp.pl/api/exchangerates/rates/{table}/{code}/{date}

gdzie:
{table} - 'a' | 'b' | 'c',
{code} - zgodnie z normą [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) (np. EUR, USD, DOL, itd.),
{date} - data w formacie yyyy-mm-dd

## Clone and Run application locally

```js
git clone https://github.com/gentlemil/currency-converter-app.git
cd ./currency-converter-app
npm i
ng serve

```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
