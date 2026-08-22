import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButtons, IonButton } from '@ionic/angular';
import { OrdinanceService } from '../../services/ordinance.service';
import { OrdinanceCardComponent } from '../../components/ordinance-card/ordinance-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ordinances',
  templateUrl: './ordinances.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, OrdinanceCardComponent, FormsModule, IonSearchbar, IonButtons, IonButton, RouterLink],
})
export class OrdinancesPage {
  private ordinanceService = inject(OrdinanceService);

  allOrdinances = this.ordinanceService.getOrdinances();
  filteredOrdinances = [...this.allOrdinances];
  searchQuery = '';

  filterOrdinances() {
    const q = this.searchQuery.toLowerCase();
    this.filteredOrdinances = this.allOrdinances.filter(o => 
      o.title.toLowerCase().includes(q) || 
      o.resNo.toLowerCase().includes(q) || 
      o.category.toLowerCase().includes(q)
    );
  }

  selectOrdinance(id: string) {
    this.ordinanceService.setSelectedId(id);
  }
}
