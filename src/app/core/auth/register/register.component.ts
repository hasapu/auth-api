import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { sha256 } from 'js-sha256';

import { AuthService } from '../auth.service';

@Component({
  selector   : 'app-register',
  templateUrl: './register.view.html',
  styleUrls  : ['./register.style.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  companyFields: string[];
  suffixFields: { label: string; value: string; }[];
  hiddenPassword: boolean;
  isPhoneNumber: boolean;
  isSpinnerLoading: boolean;
  isSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this.initDefault();
  }

  ngOnInit() {
    this.initForm();
  }

  onRegister() {
    this.isSubmitted = true;

    if (this.registerForm.invalid) { return; }

    this.isSpinnerLoading = true;

    const dataUser = {
      fullname: this.registerForm.value.fullName,
      password: sha256(this.registerForm.value.password),
      cc      : 'Static CC'
    };

    if (!isNaN(this.registerForm.value.username)) {
      Object.assign(dataUser, { email: 'static@gmail.com', phone: this.registerForm.value.username });
    } else {
      Object.assign(dataUser, { email: this.registerForm.value.username, phone: '08123456' });
    }

    this._authService
        .register(dataUser)
        .pipe(first())
        .subscribe(
          (res) => {
            this.isSpinnerLoading = false;
            console.log('Register berhasil', res);
          },
          (err) => {
            this.isSpinnerLoading = false;
            console.log('Register gagal', err);
          });
  }

  onCheckUsername(ev) {
    this.isPhoneNumber = !isNaN(ev.target.value);
    console.log('Check', ev.target.value, isNaN(ev.target.value));
  }

  onCheckPassword(ev) {
    if (this.f.password.valid) {
      this.f.passwordConfirm.reset();
    }
  }

  onCheckPasswordConfirm(ev) {
    if (this.f.password.valid) {
      if (ev.target.value !== this.f.password.value) {
        this.f.passwordConfirm.setErrors({ 'confirm': true });
      }
    }
  }

  getErrorMessages(name: string): string {
    let errorMessage = '';

    switch (name.toLowerCase()) {
      case 'company':
        if (this.f.company.hasError('required')) {
          errorMessage = 'Perusahaan harus diisi.';
        }
        break;

      case 'fullName':
      case 'fullname':
        if (this.f.fullName.hasError('required')) {
          errorMessage = 'Nama lengkap harus diisi.';
        }
        break;

      case 'password':
        if (this.f.password.hasError('required')) {
          errorMessage = 'Kata kunci harus diisi.';
        }
        break;

      case 'passwordConfirm':
      case 'passwordconfirm':
        if (this.f.passwordConfirm.hasError('required')) {
          errorMessage = 'Konfirmasi kata kunci harus diisi.';
        }

        if (this.f.passwordConfirm.hasError('confirm')) {
          errorMessage = 'Konfirmasi kata kunci tidak sesuai.';
        }
        break;

      case 'username':
        if (this.f.username.hasError('required')) {
          errorMessage = 'Email / ponsel harus diisi.';
        }

        if (this.f.username.hasError('email')) {
          errorMessage = 'Email tidak valid.';
        }
        break;

      default:
        errorMessage = 'Kolom harus diisi.';
        break;
    }

    return errorMessage;
  }

  get f() { return this.registerForm.controls; }

  private initDefault() {
    this.suffixFields = [
      {
        label: 'Bapak',
        value: 'bapak'
      },
      {
        label: 'Ibu',
        value: 'ibu'
      }
    ];

    this.companyFields = [
      'PT. AAA',
      'PT. AAB',
      'PT. AAC',
      'PT. AAB',
      'PT. AAC',
      'PT. ABA',
      'PT. ABB',
      'PT. ABC'
    ];

    this.hiddenPassword   = true;
    this.isPhoneNumber    = false;
    this.isSpinnerLoading = false;
    this.isSubmitted      = false;
  }

  private initForm() {
    this.registerForm = this.formBuilder.group({
      suffix         : [this.suffixFields[0].value, Validators.required],
      fullName       : ['', Validators.required],
      company        : ['', Validators.required],
      username       : ['', Validators.required],
      password       : ['', Validators.required],
      passwordConfirm: '',
      terms          : ['', Validators.required]
    });
  }
}
