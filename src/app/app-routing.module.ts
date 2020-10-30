import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DetailsOcrPageComponent } from './details-ocr-page/details-ocr-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardPageComponent  },
    { path: 'details-ocr', component:DetailsOcrPageComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
