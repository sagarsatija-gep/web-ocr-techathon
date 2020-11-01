import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  userId;
  authForm;
  constructor(private route: Router,private service:RestApiService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(this.userId),
      password: new FormControl(''),
  });
  }
  onSubmit() {
    this.userId=this.authForm.value.email;
    this.service.setUserType(this.userId);
    console.log(this.userId,this.service.getUserType())
    this.route.navigate(['dashboard']);
}


}
