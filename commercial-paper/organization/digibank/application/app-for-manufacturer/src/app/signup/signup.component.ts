import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../users-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  affiliationOpts = ['org1.department1', 'org1.department2', 'org1.department3'];
  mspIds = ['Org1MSP', 'Org2MSP'];
  roles = ['Manufacturer', 'Supplier', 'Retailer', 'Distributor', 'Auditor'];

  username: string;
  mspID: string;
  role: string;

  newUser: any;

  constructor(private usersApiService: UsersApiService) { }

  ngOnInit() {
  }

  signup(): any{
    this.usersApiService.register(this.username, this.role, this.mspID)
    .subscribe((data: any) => {
      console.log(data);
      this.newUser = data;
    })
  }

}
