// src/app/services/item.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Item {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items = new BehaviorSubject<Item[]>([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ]);
  items$ = this.items.asObservable();

  constructor() {}

  addItem(name: string) {
    const currentItems = this.items.getValue();
    const newItem: Item = { id: Date.now(), name };
    this.items.next([...currentItems, newItem]);
  }

  updateItem(id: number, name: string) {
    const currentItems = this.items.getValue().map(item =>
      item.id === id ? { ...item, name } : item
    );
    this.items.next(currentItems);
  }

  deleteItem(id: number) {
    const currentItems = this.items.getValue().filter(item => item.id !== id);
    this.items.next(currentItems);
  }
}
