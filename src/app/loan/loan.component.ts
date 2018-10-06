import { Component, OnInit } from '@angular/core';
import {EndpointService} from '../endpoint.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html'
})
export class LoanComponent implements OnInit {
  loanHistory;
  allData: any;

  constructor(
    private _endPoint: EndpointService
  ) { }

  async ngOnInit() {
    this.loanHistory = await this._endPoint.getData('/history');
    if (this.loanHistory.status === 'success') {
      this.allData = this.loanHistory.data.applications;
    }
  }

}
