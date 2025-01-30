import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

// ✅ Definição das rotas ANTES de usá-las
const routes = [
  { path: '', component: HomeComponent }, // Tela inicial
  { path: 'items', component: ItemListComponent } // Página de itens
];

// ✅ Exportando `appConfig` apenas UMA vez
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), // 🚀 Agora corretamente definido
    provideClientHydration(withEventReplay()),
    provideAnimations()
  ]
};
