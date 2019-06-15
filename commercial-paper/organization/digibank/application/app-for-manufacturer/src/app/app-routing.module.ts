import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogisticsMgComponent } from './logistics-mg/logistics-mg.component';
import { ProcessMgComponent } from './process-mg/process-mg.component';
import { ProcessComponent } from './process-mg/process/process.component';
import { ProcurementMgComponent } from './procurement-mg/procurement-mg.component';
import { ProcurementComponent } from './procurement-mg/procurement/procurement.component';
import { OrderComponent } from './confirm/order/order.component';
import { ProductMgComponent } from './product-mg/product-mg.component';
import { ProductComponent } from './product-mg/product/product.component';
import { AddOrderComponent } from './forms/add-order/add-order.component';
import { ModifyOrderComponent } from './forms/modify-order/modify-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logistics', component: LogisticsMgComponent },
  { path: 'process', component: ProcessMgComponent },
  { path: 'process/all', component: ProcessComponent },
  { path: 'procurement', component: ProcurementMgComponent },
  { path: 'procurement/all', component: ProcurementComponent },
  { path: 'procurement/add_new_order', component: AddOrderComponent },
  { path: 'procurement/add_new_order/:id', component: OrderComponent },
  { path: 'procurement/modify_order', component: ModifyOrderComponent },
  { path: 'procurement/modify_order/:id', component: OrderComponent },
  { path: 'product', component: ProductMgComponent },
  { path: 'product/all', component: ProductComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
}) 
export class AppRoutingModule {}