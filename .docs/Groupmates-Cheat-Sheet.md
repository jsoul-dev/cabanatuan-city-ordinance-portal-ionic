# 🚨 URGENT: Capstone Groupmates Cheat Sheet (Lab 1 Defense)

**READ THIS BEFORE THE DEFENSE.** If the professor asks you a question, this document contains the extremely simple, plain-English answers. You don't need to know how to code it, you just need to understand *what it does*.

---

## 1. The Basics (What are we even using?)

**"What framework are you using?"**
> **Answer:** "We are using **Ionic v9** combined with **Angular v19**."
> **Explanation:** Ionic provides the mobile UI (the buttons, cards, and headers that make it look like an app). Angular is the engine under the hood that handles the logic and data.

**"Are you using NgModules?"**
> **Answer:** "No sir/ma'am, we are strictly using modern **Standalone Components**."
> **Explanation:** In older Angular, you had to register every file in a giant `app.module.ts` file. In modern Angular, every component stands on its own. 

---

## 2. Reusable Components (The LEGO Blocks)

**"How did you implement Reusable Components?"**
> **Answer:** "We created an `<app-ordinance-card>` component. Instead of writing the same HTML 50 times for every ordinance, we built one card layout and reuse it inside a loop."

**"How does data get inside the component?"**
> **Answer:** "We use the modern Angular **`input()`** signal. The parent page passes the raw ordinance data *into* the card, and the card just displays it."

---

## 3. Services (The Brain / Database Mock)

**"What is a Service and how are you using it?"**
> **Answer:** "Because we can't connect to a real database yet in Unit 1, our **`OrdinanceService`** acts as our temporary database and state manager."

**"How do you connect the Service to a page?"**
> **Answer:** "We use the modern Angular **`inject()`** function to bring the service into any page that needs data."

---

## 4. Routing (Moving between pages)

**"How do users navigate from the list to the details page?"**
> **Answer:** "We strictly use declarative routing via **`routerLink`**."

**"Wait, how does the Details page know WHICH ordinance to show if you aren't passing the ID in the URL?"**
> **Answer (CRITICAL TO MEMORIZE):** 
> 1. When the user clicks the card, we trigger a click event that sends the Ordinance ID to the `OrdinanceService` to save it in memory.
> 2. At the exact same time, the `routerLink` sends the user to the `/ordinance-detail` page.
> 3. When the detail page opens, it simply asks the `OrdinanceService`, "Hey, what was the ID that was just clicked?" and grabs the data.
> *By doing this, we avoided using complex URL parameters which are not allowed in Unit 1.*

---

## 5. Angular Binding (Connecting HTML to Code)

If the prof asks to see "Data Binding", point out these 4 things:

1. **Interpolation `{{ }}`**
   * **What it is:** Putting text from the code onto the screen.
   * **Example:** `{{ ordinance.title }}` displays the title on the screen.
2. **Property Binding `[ ]`**
   * **What it is:** Changing an HTML attribute dynamically.
   * **Example:** `[color]="'success'"` to make the status badge turn green.
3. **Event Binding `( )`**
   * **What it is:** Listening for the user to do something.
   * **Example:** `(click)="doSomething()"` or `(ionInput)="filterData()"` on the search bar.
4. **Two-Way Binding `[( )]`**
   * **What it is:** Keeps the HTML input and the code perfectly synced at the exact same time. 
   * **Example:** The Search Bar uses `[(ngModel)]="searchQuery"`. When the user types, the variable updates instantly.

---

## 6. Control Flow (@for and @if)

**"Did you use `*ngFor` or `*ngIf`?"**
> **Answer:** "No, we used the new modern Angular control flow: **`@for`** and **`@if`**."

**"Where did you use them?"**
> **`@for`:** "We used `@for` on the Ordinances page to loop through our array and print out an `<app-ordinance-card>` for every item."
> **`@empty`:** "Right after the `@for` loop, we used `@empty`. If the user searches for something that doesn't exist, the array is empty, so it automatically shows our 'No ordinances found' message!"
> **`@if`:** "We used `@if` on the details page. It checks if the ordinance actually exists in the Service before trying to render the HTML. It prevents the app from crashing."
