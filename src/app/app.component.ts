import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // ✅ Standalone component
  imports: [
    CommonModule,
    MatToolbarModule, // ✅ Importação correta do toolbar
    RouterModule      // ✅ Necessário para <router-outlet>
  ]
})
export class AppComponent { }
