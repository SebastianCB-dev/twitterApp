import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getMinDate() {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    if(month.toString().length < 2) month = '0' + month.toString();
    return `${year}-${month}-${day}`;
  }

  registrar() {
    console.log("Registrando...");
  }
}
