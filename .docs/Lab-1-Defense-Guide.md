# Lab 1 Defense Guide - Cabanatuan City Ordinance Portal Prototype

This guide explains how the Ionic-Angular prototype implements the Lab 1 requirements. Use this to prepare for your professor's questions during the checking/demonstration.

## Selected Features Prototyped
1. **Ordinance Explorer:** A module for citizens and captains to browse, search, and read ordinances (List & Detail views).
2. **LGU News & Announcements:** A module to view the latest updates from the local government unit.

---

## Rubric Breakdown & Where to Find the Code

### 1. Service Implementation (15 pts)
**Concept:** A service is used to provide data or logic to multiple parts of the application centrally.
**Our Implementation:** 
- We created two services: `OrdinanceService` (`src/app/services/ordinance.service.ts`) and `NewsService` (`src/app/services/news.service.ts`).
- They use the `@Injectable({ providedIn: 'root' })` decorator.
- They contain static array data (mocking the database) and methods to retrieve and store state, e.g., `getOrdinances()`, `setSelectedId(id)`, and `getSelectedOrdinance()`.
- We inject them into our pages using the modern Angular `inject()` function.

### 2. Routing / routerLink (10 pts)
**Concept:** Used for logical navigation between different pages in a Single Page Application (SPA).
**Our Implementation:**
- Configured in `src/app/app.routes.ts` where we mapped static paths like `ordinances`, `ordinance-detail`, and `news` to their respective components.
- Used `routerLink` in the Home page (`src/app/home/home.page.ts`) on the `<ion-card>` elements to navigate without reloading the page.
- Used `routerLink="/ordinance-detail"` directly on the reusable `<app-ordinance-card>` component in `ordinances.page.html` to navigate declaratively (completely avoiding imperative Router injection).

### 3. Reusable Components (20 pts)
**Concept:** A custom component built once and reused to maintain consistency and reduce code duplication.
**Our Implementation:**
- We built the `OrdinanceCardComponent` (`src/app/components/ordinance-card/ordinance-card.component.ts`).
- **Meaningful Use:** Instead of rewriting the complex Ionic card HTML for every ordinance, we built this component. It is used inside an `@for` loop on the Ordinances list page to render each item.
- We used modern Angular signals for data passing: `input.required<Ordinance>()` (parent to child) and `output<string>()` (child emitting an event back to parent when "View Details" is clicked).

### 4. Angular Binding (15 pts)
**Concept:** Connecting the TypeScript logic/variables to the HTML template.
**Our Implementation:**
- **Interpolation (`{{ }}`):** Used everywhere to display text. Example: `{{ item.title }}` in the News page.
- **Property Binding (`[ ]`):** Used to bind dynamic values to element properties. Example: `<ion-badge [color]="ordinance.status === 'Approved' ? 'success' : 'warning'">` in the Ordinance Detail page.
- **Event Binding (`( )`):** Used to listen to user actions. Example: `(click)="viewDetails()"` in the Ordinance Card component, or `(ionInput)="filterOrdinances()"` in the Ordinances page search bar.
- **Two-way Data Binding (`[( )]`):** Used the "banana-in-a-box" syntax `[(ngModel)]="searchQuery"` on the search bar in the Ordinances page to sync the input field with the `searchQuery` variable in the TypeScript class.

### 5. Control Flow: @for and @if (10 pts)
**Concept:** Modern Angular syntax for conditional rendering and looping arrays.
**Our Implementation:**
- **`@for`:** Used in `OrdinancesPage` (`@for (ord of filteredOrdinances; track ord.id)`) and `NewsPage` to loop through the arrays and display cards.
- **`@empty`:** Added to both loops to show a "No ordinances found" or "No news available" fallback message when the array is empty.
- **`@if`:** Used in `OrdinanceDetailPage` (`@if (ordinance) { ... } @else { ... }`) to check if the ordinance was successfully found by ID. If it is undefined, it safely shows an error message instead of crashing the app.

### 6. UI/UX & Mobile Adaptation (15 pts)
**Concept:** Designing the interface to look and feel like a native mobile app using Ionic framework components.
**Our Implementation:**
- We strictly used Ionic structural components: `<ion-header>`, `<ion-toolbar>`, `<ion-title>`, and `<ion-content class="ion-padding">` across all pages.
- Used `<ion-button routerLink="/home">` inside the toolbar to provide native-feeling top-left navigation using purely allowed routing.
- Leveraged `<ion-card>`, `<ion-list>`, `<ion-item>`, and `<ion-badge>` to format the data beautifully for small screens.
- Utilized an `<ion-searchbar>` for easy mobile filtering.

---

## Possible Professor Questions & How to Answer

**Q: Why didn't you use `*ngIf` or `*ngFor`?**
*Answer:* We followed the Unit 1 guidelines which emphasize using modern Angular control flow (`@if` and `@for`). It's faster, doesn't require importing structural directives, and provides built-in fallback blocks like `@empty` which we used for our "No results" states.

**Q: How is your `OrdinanceCardComponent` a reusable component?**
*Answer:* It encapsulates the layout and logic of displaying an ordinance summary. It accepts the `Ordinance` data via an `input()` and emits a `selected` event via an `output()`. This means we can drop `<app-ordinance-card>` anywhere in the app, pass it an ordinance object, and it will render perfectly without us duplicating HTML.

**Q: Where is your two-way binding used?**
*Answer:* We imported `FormsModule` and used `[(ngModel)]="searchQuery"` on the `<ion-searchbar>` in the `OrdinancesPage`. This immediately updates the `searchQuery` variable in our class as the user types, which we then use to filter the list of ordinances.

**Q: Explain how the user gets from the list to the details page.**
*Answer:* 
1. The user clicks "View Details" on the `OrdinanceCardComponent`.
2. The card emits the ordinance's ID via its `selected` output.
3. The parent `OrdinancesPage` catches this event and passes the ID to the `OrdinanceService` to save as the currently selected item (`this.ordinanceService.setSelectedId(id)`).
4. Simultaneously, the `routerLink="/ordinance-detail"` directive attached directly to the component triggers declarative navigation.
5. The `OrdinanceDetailPage` loads and simply asks the `OrdinanceService` for the currently selected object. This entirely avoids needing complex URL parameters!
