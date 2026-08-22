import { Injectable } from '@angular/core';

export interface Ordinance {
  id: string;
  resNo: string;
  title: string;
  category: string;
  status: 'Approved' | 'Pending' | 'Draft';
  dateFiled: string;
  filedBy: string;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class OrdinanceService {
  private ordinances: Ordinance[] = [
    {
      id: '1',
      resNo: 'RES-2026-01',
      title: 'Comprehensive Solid Waste Management Ordinance',
      category: 'Environment',
      status: 'Approved',
      dateFiled: '2026-01-15',
      filedBy: 'Brgy. San Juan',
      content: 'This ordinance aims to regulate solid waste management within the barangay to promote environmental sustainability and cleanliness.'
    },
    {
      id: '2',
      resNo: 'RES-2026-02',
      title: 'Barangay Curfew Implementation',
      category: 'Public Safety',
      status: 'Pending',
      dateFiled: '2026-02-10',
      filedBy: 'Brgy. Kapitan Pepe',
      content: 'An ordinance implementing a strict curfew for minors from 10:00 PM to 4:00 AM to ensure community safety.'
    },
    {
      id: '3',
      resNo: 'RES-2026-03',
      title: 'Local Business Tax Adjustment',
      category: 'Finance',
      status: 'Approved',
      dateFiled: '2026-03-05',
      filedBy: 'Brgy. Sangitan',
      content: 'Adjusting the local business tax rates for the current fiscal year to support community development projects and infrastructure repair.'
    }
  ];

  private selectedOrdinanceId = '';

  getOrdinances() {
    return this.ordinances;
  }

  setSelectedId(id: string) {
    this.selectedOrdinanceId = id;
  }

  getSelectedOrdinance() {
    return this.ordinances.find(o => o.id === this.selectedOrdinanceId);
  }
}
