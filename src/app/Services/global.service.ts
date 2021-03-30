import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  username = ''
  
  constructor() { 
    this.setDetails()
  }
  setDetails(){
    let userdetails = sessionStorage.getItem('xRwdE');
    if(userdetails){
      this.username = userdetails;
    }else {
      this.username = '';
    }
  }
}
