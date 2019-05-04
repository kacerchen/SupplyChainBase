import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProcessMgComponent } from './process-mg/process-mg.component';
import { ProductMgComponent } from './product-mg/product-mg.component';
import { ProcurementMgComponent } from './procurement-mg/procurement-mg.component';
import { LogisticsMgComponent } from './logistics-mg/logistics-mg.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { LatestProcessTableComponent } from './tables/latest-process-table/latest-process-table.component';
import { SearchProcessTableComponent } from './tables/search-process-table/search-process-table.component';
import { AllProcessesTableComponent } from './tables/all-processes-table/all-processes-table.component';
import { WeightChangeComponent } from './charts/weight-change/weight-change.component';
import { AddProcessComponent } from './forms/add-process/add-process.component';
import { TempChangeComponent } from './charts/temp-change/temp-change.component';
import { UpdateProcessComponent } from './forms/update-process/update-process.component';
import { AllProductsTableComponent } from './tables/all-products-table/all-products-table.component';
import { ProcessHistoryTableComponent } from './tables/process-history-table/process-history-table.component';
import { ProductHistoryTableComponent } from './tables/product-history-table/product-history-table.component';
import { SearchProductTableComponent } from './tables/search-product-table/search-product-table.component';
import { AddProductComponent } from './forms/add-product/add-product.component';
import { UpdateProductComponent } from './forms/update-product/update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProcessMgComponent,
    ProductMgComponent,
    ProcurementMgComponent,
    LogisticsMgComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    MenuComponent,
    LatestProcessTableComponent,
    SearchProcessTableComponent,
    AllProcessesTableComponent,
    WeightChangeComponent,
    AddProcessComponent,
    TempChangeComponent,
    UpdateProcessComponent,
    AllProductsTableComponent,
    ProcessHistoryTableComponent,
    ProductHistoryTableComponent,
    SearchProductTableComponent,
    AddProductComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
