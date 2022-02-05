import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { data } from './data';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const data = [
      {id: 1, name:'abc', amount: 15000,date: "26/03/21",installments: 4},
      {id: 2, name:'def', amount: 5000,date: "26/04/21",installments: 2},
      {id: 3, name:'ghi', amount: 10000,date: "02/03/21",installments: 3},
      {id: 4, name:'jkl', amount: 5000,date: "03/03/21",installments: 2},
    ];
    return {data};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(d: data[]): number {
    return d.length > 0 ? Math.max(...d.map(d => d.id)) + 1 : 1;
  }
}
