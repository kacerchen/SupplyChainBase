import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() user_name: any;
  username:  string;
  user: Object;
  mspid: string;
  role: string;
  processView: boolean;
  productView: boolean;
  logisticsView: boolean;
  procurementView: boolean;

  constructor(private route: ActivatedRoute, private usersApiService: UsersApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.user_name);
    this.getUser(this.user_name); 
  }

  getUser(username: string): any{
    this.usersApiService.getUser(username)
    .subscribe((data: any) => {
      // console.log(data);
      console.log(data.user);
      this.user = data.user;
      this.role = data.user.role;
      this.mspid = data.user.mspid;

      this.setViewPermission();
    })
  }

  setViewPermission(): void{

    switch(this.role) {
      case "Manufacturer": {
        this.processView = true;
        this.productView = true;
        this.procurementView = true;
        this.logisticsView = true;

        break;
      }

      case "Supplier": {
        this.processView = true;
        this.productView = true;
        this.procurementView = true;
        this.logisticsView = true;

        break;
      }

      case "Retailer": {
        this.productView = true;
        this.logisticsView = true;
        this.procurementView = true;

        break;
      }

      case "Distributor": {
        this.logisticsView = true;

        break;
      }

      case "Auditor": {
        this.processView = true;

        break;
      }
    }
  }

}
