import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const id = this.loginFormGroup.get('id').value;
    const pw = this.loginFormGroup.get('passwoed').value;
    console.log('Log In: %s, %s', id, pw);
  }

}
