import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService, Item } from '../../services/item.service'; // ✅ Adjust import if needed
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule], // ✅ Importação correta

  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    public dialogRef: MatDialogRef<ItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itemForm = this.fb.group({
      name: [data ? data.name : '', Validators.required],
    });
  }

  save() {
    if (this.data) {
      this.itemService.updateItem(this.data.id, this.itemForm.value.name);
    } else {
      this.itemService.addItem(this.itemForm.value.name);
    }
    this.dialogRef.close();
  }
}
