import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {sha256} from 'js-sha256';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {ValidationsService} from '../../../shared/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.view.html'
})

export class LoginComponent implements OnInit{
  errorMessage;
  authData;
  data:any;
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    public _validator: ValidationsService
  ) {}

  get f() {
      this._validator.emailFormat(this.loginForm.controls);
    return this.loginForm.controls;
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.data = {
      email: this.loginForm.value.email,
      password: sha256(this.loginForm.value.password)
    }
    this.authData = await this._authService.login(this.data);
    if (this.authData.status === 'success') {
      localStorage.setItem('authData', JSON.stringify(this.authData.data));
      this.router.navigate(['dashboard']);
    } else {
      this.errorMessage = this.authData.error.message;
    }
  }
}
