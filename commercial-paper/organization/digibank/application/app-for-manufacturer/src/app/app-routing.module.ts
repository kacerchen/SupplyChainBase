import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogisticsMgComponent } from './logistics-mg/logistics-mg.component';
import { ProcessMgComponent } from './process-mg/process-mg.component';
import { ProcurementMgComponent } from './procurement-mg/procurement-mg.component';
import { ProductMgComponent } from './product-mg/product-mg.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'logistics', component: LogisticsMgComponent },
  { path: 'process', component: ProcessMgComponent },
  { path: 'procurement', component: ProcurementMgComponent },
  { path: 'product', component: ProductMgComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
}) 
export class AppRoutingModule {}