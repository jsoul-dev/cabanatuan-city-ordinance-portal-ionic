import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBadge, IonItem, IonLabel, IonList } from '@ionic/angular';
import { OrdinanceService, Ordinance } from '../../services/ordinance.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ordinance-detail',
  templateUrl: './ordinance-detail.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBadge, IonItem, IonLabel, IonList, RouterLink],
})
export class OrdinanceDetailPage {
  private ordinanceService = inject(OrdinanceService);
  
  ordinance: Ordinance | undefined = this.ordinanceService.getSelectedOrdinance();
}
