import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerNameType: SpinnerType, time?:number) {
    this.spinner.show(spinnerNameType);

    if(time){
      setTimeout(() => {
        this.hideSpinner(spinnerNameType);
      }, time);
    }
  }
  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
  }
}
export enum SpinnerType {
  BallScaleMultiple = 's1',
  Pacman = 's2',
  BallTrianglePath = 's3',
}
