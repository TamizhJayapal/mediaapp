import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  constructor(private _fb:FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      userid:['',Validators.required],
      password:['',Validators.required]
    })
  }

  showGallery(form:any){
    if(form.status == 'INVALID'){
      alert('Enter valid credencials')
      return;
    }

    const users:any = this.http.get('http://localhost:4200/assets/userdb.json').subscribe((data)=>{
      let flid:any = _.find(data, (obj:any)=>{
        return obj.userid == form.value.userid;
      });
      if(flid == '' || flid == undefined){
        alert('Invalid email id')
        return;
      }
      if(flid.password != form.value.password){
        alert('Invalid password');
        return;
      }

      sessionStorage.setItem('xRwdE',flid.username);
      this.dialogRef.close(flid)

     })
     
     
  }

  cancel(){
    this.dialogRef.close('')
  }

}
