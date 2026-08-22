import { Injectable } from '@angular/core';

export interface News {
  id: string;
  title: string;
  date: string;
  summary: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private newsList: News[] = [
    {
      id: '1',
      title: 'LGU Cabanatuan Launches New Ordinance Portal',
      date: '2026-08-20',
      summary: 'The new Cabanatuan City Ordinance Portal is now live, making it easier for citizens to access and review local laws and regulations.',
      author: 'City Information Office'
    },
    {
      id: '2',
      title: 'Upcoming Town Hall Meeting on Solid Waste',
      date: '2026-08-25',
      summary: 'Join us for a town hall meeting discussing the implementation details of the new Comprehensive Solid Waste Management Ordinance. Public feedback is encouraged.',
      author: 'Environment Dept.'
    }
  ];

  getNews() {
    return this.newsList;
  }
}
