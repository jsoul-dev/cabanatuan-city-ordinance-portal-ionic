# 🎤 Capstone v2 Ionic - Lab 1 Presentation Script

This script is designed to help your group seamlessly present the **Cabanatuan City Ordinance Portal** prototype while explicitly checking off every single rubric requirement for the professor. 

---

## 1. Introduction
**[Action: Open the app on `http://localhost:8100/home`]**
**Speaker:** "Good [morning/afternoon], Sir/Ma'am. For our Laboratory 1, we implemented the mobile prototype of our Capstone Project, the *Cabanatuan City Ordinance Portal*. We adapted our web system into an Ionic-Angular app, focusing strictly on the Unit 1 scope."

---

## 2. UI/UX (Mobile Design)
**[Action: Scroll up and down on the Home Page]**
**Speaker:** "For the **UI/UX requirement**, our interface is built responsively for mobile using Ionic's grid and styling.
- **Where to look:** In `src/theme/variables.scss`, we implemented a custom theme by overriding Ionic variables like `--ion-color-primary: #065f46;`.
- We created custom CSS classes like `.lgu-card` to style the cards securely across light and dark modes without breaking Ionic's native dark mode integration.
- Inside `src/app/home/home.page.html`, we leveraged standard `<ion-card>`, `<ion-grid>`, and `<ion-toolbar>` tags."

---

## 3. Routing & Navigation
**[Action: Click on the 'Ordinance Explorer' card to navigate to the list]**
**Speaker:** "For **Routing**, we strictly used standalone component routing.
- **Where to look:** In `src/app/app.routes.ts`, we defined our routes using the modern standalone approach, for example: `loadComponent: () => import('./pages/ordinances/ordinances.page').then(m => m.OrdinancesPage)`.
- Inside `home.page.html`, we attached the `routerLink="/ordinances"` attribute directly to the `<ion-card>` to handle logical, instant navigation without page reloads.
- We completely avoided imperative routing! On the list page, navigation is driven entirely by a `routerLink` directly attached to our custom `<app-ordinance-card>`."

---

## 4. Reusable Components & Angular Binding
**[Action: Stay on the Ordinances List Page (`/ordinances`)]**
**Speaker:** "Every ordinance you see is rendered using a **Reusable Component** to keep our code DRY.
- **Where to look:** In `src/app/components/ordinance-card/ordinance-card.component.ts`, we utilize the modern Angular Signal API by declaring `ordinance = input.required<Ordinance>()` to receive data, and `selected = output<string>()` to emit click events.
- **[Action: Type 'Waste' into the Searchbar]**
- For **Angular Binding**, in `ordinances.page.html`, we bound our search bar directly to a TypeScript variable using two-way binding: `[(ngModel)]="searchQuery"`. 
- When the input changes, we trigger `(ionInput)="filterOrdinances()"` via Event Binding. Inside the card, we also use Property Binding like `[color]` to dynamically change the badge color based on the status."

---

## 5. @for and @if Control Flow
**[Action: Delete your search query so all ordinances show up]**
**Speaker:** "To render this dynamic list, we utilized Angular's modern **Control Flow** syntax.
- **Where to look:** In `ordinances.page.html`, instead of legacy `*ngFor`, we wrote `@for (ord of filteredOrdinances; track ord.id)`. 
- This loops through our TypeScript array and generates an `<app-ordinance-card>` for each item. 
- **[Action: Type 'asdfgh' into the search bar]** We also appended an `@empty` block right after it, which acts as a fallback to show a 'No ordinances found' `<div>` when the array is empty."

---

## 6. Services & Data Management
**[Action: Click 'View Details' on an ordinance to open the detail page]**
**Speaker:** "Finally, for the **Service** requirement, we avoided complex URL routing and relied heavily on a centralized service.
- **Where to look:** In `src/app/services/ordinance.service.ts`, we created a service with `@Injectable({ providedIn: 'root' })`.
- It acts as our application's state. When a card is clicked, `ordinances.page.ts` injects the service using `private ordinanceService = inject(OrdinanceService);` and calls `setSelectedId(id)`.
- **[Action: Point to the detail screen]** Then, when this `ordinance-detail.page.ts` loads, it simply calls `this.ordinanceService.getSelectedOrdinance()` to retrieve the exact object from memory.
- In `ordinance-detail.page.html`, we use an `@if (ordinance)` block to safely render the HTML only when the service successfully provides the data.

That concludes our technical walkthrough covering all the Laboratory 1 rubric requirements. Thank you!"
