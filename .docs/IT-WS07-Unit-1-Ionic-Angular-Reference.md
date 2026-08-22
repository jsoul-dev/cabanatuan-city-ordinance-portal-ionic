# Unit 1 – Ionic-Angular Foundation Reference
### For: Laboratory Activity 1 – Capstone Mobile Prototype

This document summarizes everything from **Unit 1 (Mobile Application Foundation Review)** that is relevant to building **Lab 1**, so an AI coding agent can use it as a style/technique reference when generating the Ionic-Angular capstone prototype.

---

## 1. Lab 1 Requirements (Recap)

Build an **Ionic-Angular** mobile prototype based on **at least 2 features/modules** from an existing capstone project. It does **not** need to be functional/connected to a real backend — static/sample data is fine.

The implementation **must demonstrate**:

| Requirement | Points | Notes |
|---|---|---|
| Service Implementation | 15 | Provide data/functionality to the app |
| Routing / routerLink | 10 | Working, logical navigation between pages |
| Reusable Components | 20 | Must have a meaningful reusable purpose |
| Angular Binding | 15 | Interpolation, property binding, event binding, and/or form binding |
| @for and @if | 10 | Meaningful use for repeated/conditional content |
| UI/UX & Mobile Adaptation | 15 | Interface appropriately designed for mobile |
| Demonstration & Individual Understanding | 15 | Any member may be asked to explain any part |

**Important:** Do not add features/code solely to satisfy a rubric line — every implementation must have a logical purpose within the actual prototype. Avoid over-engineering; each requirement should map to a real feature of the capstone module being prototyped.

---

## 2. Tech Stack Roles

- **Ionic Framework** → provides UI components (`ion-header`, `ion-content`, `ion-card`, `ion-button`, `ion-list`, `ion-input`, etc.) and mobile-oriented UX.
- **Angular** → provides app structure/logic: components, routing, data binding, dependency injection, signals.
- **Capacitor** → connects the web app to native device features (not required for this lab since prototype can use static data, but keep architecture compatible).

Use **Ionic-Angular standalone components** (no NgModules). Every Ionic component or Angular directive used in a template **must** be added to that component's `imports` array.

---

## 3. Project Structure Cheat Sheet

```
src/app/
  home/                     → a page (folder per page)
  about/                    → another page
  components/
    student-card/           → a reusable component
  services/
    student.service.ts      → a service
  app.routes.ts              → route definitions
  app.component.ts           → root component
```

Generate files with Ionic CLI (keeps things organized):
```bash
ionic g page pages/<page-name>
ionic g component components/<component-name>
ionic g service services/<service-name>
```

Naming pattern:
- Folder `student-card` → class `StudentCardComponent`, selector `app-student-card`
- Always verify actual class/selector inside the generated file (may be customized).

---

## 4. Ionic Page Layout

Every page should be structured with:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Page Title</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <!-- main scrollable content goes here -->
</ion-content>

<ion-footer> <!-- optional -->
  <ion-toolbar>
    <ion-title>Footer text</ion-title>
  </ion-toolbar>
</ion-footer>
```

- `ion-content` is the main, scrollable area — put ordinary page content here.
- Every Ionic component used (e.g. `IonHeader`, `IonToolbar`, `IonTitle`, `IonContent`, `IonFooter`) must be imported from `@ionic/angular/standalone` and listed in the component's `imports` array.

---

## 5. Displaying Data (Interpolation)

```ts
export class HomePage {
  appTitle = 'Feature Name';
  student = { firstName: 'Juan', lastName: 'Dela Cruz', course: 'BSIT' };
}
```
```html
<h2>{{ appTitle }}</h2>
<p>{{ student.firstName }} {{ student.lastName }}</p>
```

⚠️ Never interpolate a whole object/array directly (`{{ student }}` → `[object Object]`). Access specific properties (`student.firstName`) or use `@for`/indices.

---

## 6. Control Flow: @for and @if

### @for (loop through arrays)
```html
@for (item of items; track item.id) {
  <p>{{ item.name }}</p>
} @empty {
  <p>No records available.</p>
}
```
- `track` should use a unique field (e.g. `id`) whenever available.
- `$index`, `$count`, `$first`, `$last`, `$even`, `$odd` are available inside the block.

### @if / @else if / @else (conditional content)
```html
@if (item.isActive) {
  <p>Status: Active</p>
} @else if (item.isPending) {
  <p>Status: Pending</p>
} @else {
  <p>Status: Inactive</p>
}
```

**Use meaningfully** — e.g., loop through a list of capstone records (@for), and conditionally show status/badges/empty states (@if). Don't add loops/conditionals that don't serve the actual feature.

---

## 7. Property Binding

Square brackets bind a component value (not just text) to an element/component property:
```html
<ion-img [src]="student.photoUrl" [alt]="student.firstName"></ion-img>
<ion-button [disabled]="isActionDisabled" [color]="buttonColor">Save</ion-button>
<ion-progress-bar [value]="completionRate"></ion-progress-bar>
```
Use property binding for booleans, numbers, objects, arrays, or dynamic expressions — not just strings.

---

## 8. Event Binding

Parentheses bind a DOM/component event to a method call:
```html
<ion-button (click)="showAlert()">Show Alert</ion-button>
<ion-button (click)="setStaticTitle('Updated Title')">Set Static</ion-button>
<ion-button (click)="setDynamicTitle(titleInput.value)">Set Dynamic</ion-button>
```
Three common patterns: no-argument call, static-argument call, dynamic-argument call (often combined with a template reference variable).

---

## 9. Template Reference Variables

```html
<ion-input #titleInput placeholder="Enter title"></ion-input>
<ion-button (click)="setDynamicTitle(titleInput.value)">Set</ion-button>
```
`#titleInput` refers to the `ion-input` element; `.value` reads its current value without needing form binding.

---

## 10. Form Data Binding (FormsModule)

Import `FormsModule` from `@angular/forms` and add it to the page's `imports` array before using `ngModel`.

**One-way** (component → input only):
```html
<ion-input [ngModel]="studentName"></ion-input>
```

**Two-way** ("banana-in-a-box", keeps both in sync):
```html
<ion-input [(ngModel)]="studentName"></ion-input>
```
Use two-way binding for editable form fields tied to a component property; use one-way when the input should be pre-filled/reset programmatically but user edits shouldn't overwrite the source property.

---

## 11. Reusable Components

1. Generate: `ionic g component components/<name>`
2. Build its own template + import any Ionic components it uses into **its own** `imports` array (a parent importing `IonCard` does NOT make it available inside the child — each standalone component declares its own template dependencies).
3. Import the component class into the parent page's `.ts` file, and add it to the parent page's `imports` array.
4. Use it in the parent template via its selector: `<app-student-card></app-student-card>`.

**Rubric emphasis:** the reusable component must have a genuine reusable purpose (e.g., a card used to display multiple records of the same shape across one or more pages, or repeated inside an `@for` loop) — not just a component wrapper split off arbitrarily.

### Making it configurable (input / output / model — see §14) is expected practice for a "meaningful" reusable component.

---

## 12. Routing (routerLink)

`app.routes.ts`:
```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'about', loadComponent: () => import('./about/about.page').then(m => m.AboutPage) },
];
```

In a page, import `RouterLink` from `@angular/router`, add it to `imports`, then:
```html
<ion-button routerLink="/about">Open About Page</ion-button>
```
⚠️ The **route path** (not the folder name) is authoritative — always verify against `app.routes.ts`.

Navigation should be **logical** — e.g., list page → detail page, dashboard → module pages — matching the actual capstone flow, not arbitrary links.

---

## 13. Services & Dependency Injection

A service centralizes shared/static data or logic. For this prototype, static/sample arrays are acceptable (no real backend required).

`student.service.ts`:
```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private students = [ /* static sample data */ ];
  getStudents() {
    return this.students;
  }
}
```

Inject into a page or reusable component using `inject()` (not the `imports` array — services are not added there):
```ts
import { Component, inject } from '@angular/core';
import { StudentService } from '../services/student.service';

export class HomePage {
  private studentService = inject(StudentService);
  students = this.studentService.getStudents();
}
```

**Rubric emphasis:** the service should genuinely "provide data or functionality" to at least one real feature/module of the capstone (e.g., a service per feature/module, or a shared service consumed by both selected features).

---

## 14. Modern Component Communication (Signals, input/output/model)

While Lab 1's rubric focuses on Service / Routing / Reusable Components / Binding / @for-@if / UI-UX, using **signals** and **input()/output()/model()** is good practice for "meaningful" reusable components and is covered in Unit 1.3 — consider it for a stronger reusable-component score, but it is not itself a separate rubric line.

### Writable Signals
```ts
import { signal } from '@angular/core';
readonly score = signal(70);
// read: score()  |  update: score.set(80)  |  score.update(v => v + 5)
```

### Computed Signals
```ts
import { computed } from '@angular/core';
readonly result = computed(() => this.score() >= 75 ? 'Passed' : 'Failed');
```

### input() — parent → child
```ts
// child
readonly name = input.required<string>();
readonly course = input<string>('BSIT');
```
```html
<!-- parent -->
<app-student-card [name]="studentName()" [course]="studentCourse()"></app-student-card>
```

### output() — child → parent
```ts
// child
readonly selected = output<string>();
selectStudent() { this.selected.emit(this.name()); }
```
```html
<!-- parent -->
<app-student-card (selected)="handleStudentSelection($event)"></app-student-card>
```

### model() — two-way parent ↔ child
```ts
// child
readonly enrolled = model<boolean>(false);
toggleEnrollment() { this.enrolled.update(v => !v); }
```
```html
<!-- parent: pass the SIGNAL instance, not its value -->
<app-student-card [(enrolled)]="studentEnrolled"></app-student-card>
```

---

## 15. Core Data Flow Quick Reference

| Feature | Purpose | Direction |
|---|---|---|
| Interpolation `{{ }}` | Display data as text | Component → Template |
| Property binding `[prop]` | Assign value to a property | Component → Template |
| Event binding `(event)` | Call method on user action | Template → Component |
| Template ref variable `#name` | Local element reference | Template-local |
| One-way `[ngModel]` | Send value to input | Component → Input |
| Two-way `[(ngModel)]` | Keep synced | Component ↔ Input |
| `routerLink` | Navigate to a route | Page → Page |
| Service + `inject()` | Shared data/logic | Service → Page/Component |
| `input()` | Parent supplies data to child | Parent → Child |
| `output()` | Child notifies parent | Child → Parent |
| `model()` | Two-way component binding | Parent ↔ Child |

---

## 16. Scope Boundary — Use ONLY What Unit 1 Covers

This is a **foundation review** lab. The prototype must be buildable using **only** the techniques below. Anything not listed here has **not** been taught yet and must **not** appear in the code, even if it's a "better" or more idiomatic Angular/Ionic solution.

### ✅ Allowed (taught in Unit 1)
- Standalone components with per-component `imports` arrays (no NgModules)
- `ion-header` / `ion-content` / `ion-footer` layout containers
- Interpolation `{{ }}`
- Control flow blocks: `@for ... track ...`, `@empty`, `@if / @else if / @else`
- Property binding `[prop]="expr"`
- Event binding `(event)="method()"`
- Template reference variables `#var`
- `FormsModule` with `[ngModel]` (one-way) and `[(ngModel)]` (two-way)
- Generating pages/components/services with `ionic g ...`
- Reusable standalone components imported into a parent's `imports` array
- `routerLink` + `app.routes.ts` with `loadComponent`
- Services with `@Injectable({ providedIn: 'root' })`, static/local data, and `inject()` for DI
- Signals: `signal()`, `.set()`, `.update()`, `computed()`
- Modern component communication: `input()`, `input.required()`, `output()`, `model()`

### ❌ Not yet taught — do NOT use
- `NgModule` / `@NgModule` — the project is standalone-only
- Old structural directives `*ngIf`, `*ngFor`, `*ngSwitch` — use `@if` / `@for` instead
- Classic decorator-based `@Input()` / `@Output()` — use `input()` / `output()` / `model()` instead
- Constructor-based dependency injection (`constructor(private x: Service)`) — use `inject()` instead
- RxJS Observables, `HttpClient`, `async` pipe, or any real API calls
- `ReactiveFormsModule` / `FormGroup` / `FormBuilder` — only `FormsModule` + `ngModel` is covered
- Angular lifecycle hooks (`ngOnInit`, etc.) unless the capstone group already knows them from a prior course — not part of this unit's material
- Route guards, resolvers, or lazy-loaded feature modules
- NgRx or any external state-management library
- Pipes (`| date`, `| currency`, custom pipes, etc.)
- Any third-party UI/animation library beyond Ionic's built-in components

If a feature genuinely requires something outside this list, flag it instead of silently implementing it — don't substitute an untaught technique without saying so.

---

## 17. Practical Checklist for Building Lab 1

1. **Pick 2+ features/modules** from the capstone (e.g., "Student Records" + "Attendance Tracking").
2. For each feature, plan: a **list page**, maybe a **detail/form page**, one **reusable component** (e.g., a card/list-item), and a **service** with static sample data.
3. Wire pages together with **routerLink** in a logical flow (e.g., Home → Feature List → Feature Detail).
4. In list pages, use **@for** to render service data through the reusable component; use **@if** for meaningful conditional states (e.g., empty list, status badges, enrolled/active flags).
5. Use **interpolation** for display text, **property binding** for dynamic attributes/values, and **event binding** for actions (view, select, toggle, delete-from-UI, etc.).
6. Optionally use **ngModel** for a simple filter/search or form field if the feature calls for user input.
7. Style with Ionic components (`ion-card`, `ion-list`, `ion-badge`, `ion-fab`, `ion-searchbar`, etc.) and ensure layout uses `ion-header` / `ion-content` correctly, with mobile-friendly spacing (`ion-padding`) and responsive lists/grids.
8. Double-check every standalone component's `imports` array includes exactly the Ionic components/Angular directives/child components its own template uses.
9. Avoid decorative-only code — every binding, loop, condition, service call, and route should map to something a demonstrator can explain as part of the real capstone feature.
