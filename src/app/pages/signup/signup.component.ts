import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.signupFormGroup = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    const id = this.signupFormGroup.get('id').value;
    const pw = this.signupFormGroup.get('passwoed').value;
    console.log('Sign Up: %s, %s', id, pw);
  }

}

