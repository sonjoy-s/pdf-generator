import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './_components/app.component';

const appRoutes: Routes = [
    { path: '**', redirectTo: '' },
    {path: '', component: AppComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
