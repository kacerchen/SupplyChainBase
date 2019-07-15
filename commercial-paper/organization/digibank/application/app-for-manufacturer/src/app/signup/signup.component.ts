import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  org: string = 'org1';

  enrolled: boolean;
  newUser: any;

  constructor(private usersApiService: UsersApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }

  signup(): any{
    this.usersApiService.register(this.username, this.role, this.mspID)
    .subscribe((data: any) => {
      console.log(data);
      // this.newUser = data;
      console.log(this.isExisted());
      this.setUser(this.username, this.role);
    })
  }

  isExisted(): any{
    this.usersApiService.login(this.username)
    .subscribe((data: any) => {
      console.log(data);
      this.enrolled = data.userExist;
      if(this.enrolled) {
        this.setUser(this.username, this.role);
      }
    })
  }

  setUser(username: string, role: string): any{
    this.usersApiService.setUserContext(this.username, this.role)
    .subscribe((data: any) => {
      console.log(data);
      this.newUser = data;
    })
  }

}
