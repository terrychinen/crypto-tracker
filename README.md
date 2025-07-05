[Leer en español](README.es.md)
---

# CryptoTracker - Cryptocurrency Dashboard
A web application developed with Angular to visualize the data from the cryptocurrency market.

## Main Features
* Dashboard with a table of the top 100 cryptocurrencies.
* Real-time data filtering, pagination and sorting.
* Detail page with historical price chart for each coin.
* Responsive design for mobile and desktop.
* Modern status management with Signals.

## Architectural Highlights ✨

* **Generic & Decoupled Datatable Component:** One of the core goals of this project was to build a truly reusable datatable component. The component is fully generic (`<T>`) and uses content projection (`ng-template`) to render cell content. This means the parent component has 100% control over the cell's template, making the table completely agnostic of the data it displays. The core logic is decoupled from the presentation layer (Angular Material), which makes future migrations to a different UI component library much more straightforward.

## Technology Stack
* **Frontend:** Angular 20, TypeScript, SCSS
* **UI:** Angular Material
* **Graphics:** ng2-charts (Chart.js)
* **Code Quality:** ESLint, Prettier

## To Run Locally
1. Clone the repository: `git clone https://github.com/terrychinen/crypto-tracker`
2. Install dependencies: `npm install`
3. Run the development server: `ng serve -o`
