import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProcessMgComponent } from './process-mg/process-mg.component';
import { ProductMgComponent } from './product-mg/product-mg.component';
import { ProcurementMgComponent } from './procurement-mg/procurement-mg.component';
import { LogisticsMgComponent } from './logistics-mg/logistics-mg.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProcessMgComponent,
    ProductMgComponent,
    ProcurementMgComponent,
    LogisticsMgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
