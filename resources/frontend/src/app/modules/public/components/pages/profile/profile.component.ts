import { Component, OnInit, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public name = 'Christian, Tankeu Donkou';
  public userEmail = "tdc_86@yahoo.fr";
  public pwDisabled = true;
  public hasPwError = null;
  public hasEmailError = false;
  public formClassPW = {
    'hasError': this.hasPwError != null && this.hasPwError,
    'isSuccess':  this.hasPwError != null && !this.hasPwError,
    'form-control': true
  }
  public formClassEM = {
    'hasError': this.hasEmailError,
    'isSuccess': !this.hasEmailError,
    'form-control': true
  }
  private regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    console.log("event = ", event);
  }
  onBlur(event) {
    if (event.target.value !== null && event.target.value !== '') {
      // console.log("event.target.value = ", event.target.value);
      // console.log("this.regexp.test = ", this.regexp.test(event.target.value));
      if (this.regexp.test(event.target.value)) {
        this.pwDisabled = false;
      } else {
        this.pwDisabled = true;
        this.hasEmailError = true;
      }
      
    } else {
      this.pwDisabled = true;
      this.hasEmailError = true;
    }
    
  }

  logMessage(email, pass) {
    console.log("My e-mail = ", email);
    console.log("My password = ", pass);
  }

}
