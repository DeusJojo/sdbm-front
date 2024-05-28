import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { VentesComponent } from './ventes/ventes.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    {
        path: '', component: HeaderComponent,
        children: [
            {
                path: 'articles', component: ArticlesComponent, pathMatch: 'full',
            },
            {
                path: 'ventes', component: VentesComponent, pathMatch: 'full',
            },
        ]
    }
];
