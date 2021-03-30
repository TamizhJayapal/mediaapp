import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { GlobalService } from './Services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Yellow leaf Media';
  isPrivateUser =false;
  username = '';
  constructor(private dialog: MatDialog,
    private globalservice: GlobalService){}
  ngOnInit(){
    this.getUserDetails();
   }
    logout(){
      this.isPrivateUser = false;
      sessionStorage.removeItem('xRwdE')
    }
   getUserDetails(){
     this.username = this.globalservice.username;
     this.isPrivateUser = this.globalservice.username ? true : false;
   }
  
  login(){
    const dialogRef = this.dialog.open(LoginComponent, {disableClose:true,data:{
      form:'login'
    }});

    dialogRef.afterClosed().subscribe((result)=>{
      if(result.userid){
        this.isPrivateUser =true; 
        this.username = result.username       
      }else {
        this.isPrivateUser = false;
        this.username = ''
      }
    });
  }


}
