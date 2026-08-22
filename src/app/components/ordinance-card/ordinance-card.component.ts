import { Component, input, output } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBadge, IonButton } from '@ionic/angular';
import { Ordinance } from '../../services/ordinance.service';

@Component({
  selector: 'app-ordinance-card',
  templateUrl: './ordinance-card.component.html',
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBadge, IonButton],
})
export class OrdinanceCardComponent {
  readonly ordinance = input.required<Ordinance>();
  readonly selected = output<string>();

  viewDetails() {
    this.selected.emit(this.ordinance().id);
  }
}
