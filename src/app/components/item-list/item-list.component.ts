import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ItemService, Item } from '../../services/item.service';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  standalone: true, // ✅ Standalone Component
  imports: [ // ✅ Adicionando todos os módulos necessários
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  items: Item[] = [];

  private itemService = inject(ItemService); // ✅ Forma recomendada no Angular 17+
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.itemService.items$.subscribe(data => {
      this.items = data;
    });
  }

  openDialog(data?: Item) {
    this.dialog.open(ItemFormComponent, {
      width: '300px',
      data: data,
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id);
  }
}
