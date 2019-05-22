import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  userExist: boolean;

  constructor(private usersApiService: UsersApiService, private router: Router) { }

  ngOnInit() {
  }

  login(): any{
    this.usersApiService.login(this.username)
    .subscribe((data: any) => {
      console.log(data);
      this.userExist = data;

      if(this.userExist) {
        let navigationExtra: NavigationExtras = {
          queryParams: {'username': this.username },
        }

        this.router.navigate(['/dashboard'], navigationExtra);
      } else {
        this.router.navigate(['/signup']);
      }
    })
  }

}
