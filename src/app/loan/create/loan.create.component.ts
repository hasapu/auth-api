import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EndpointService} from '../../endpoint.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './loan.create.view.html'
})
export class LoanCreateComponent implements OnInit {
  send;
  loanForm: FormGroup;
  purposes = [
    'Menikah',
    'Pendidikan',
    'Usaha'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private _endPoint: EndpointService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      cc: ['BXC7', Validators.required],
      appType: ['Flexible Pay', Validators.required],
      purpose: ['', Validators.required],
      amount: ['', Validators.required],
      process: [true]
    });
  }

  async onSubmit() {
    if (this.loanForm.valid) {
      this.send = await this._endPoint.postData('/apply', this.loanForm.value);
      if (this.send.status === 'success') {
        this.router.navigate(['loan']);
      }
    }
  }

}
