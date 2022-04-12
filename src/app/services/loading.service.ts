import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;

  constructor(private spinner: NgxSpinnerService) { }

  public show(){
    this.spinner.show();
  }

  public hide(){
    this.spinner.hide();
  }
}
