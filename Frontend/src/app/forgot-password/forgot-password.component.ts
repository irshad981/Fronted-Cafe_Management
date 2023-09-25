import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstnts } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm : any = FormGroup;
  token: any='';
  data:any;

  responseMessage : any;


  constructor(private formBuilder: FormBuilder ,
     private userService : UserService,
    private dialogRef : MatDialogRef<ForgotPasswordComponent>,
    private ngxService:NgxUiLoaderService , 
    private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.token= localStorage.getItem('token');
    console.log(this.token);
    this.forgotPasswordForm = this.formBuilder.group({
      email:[null , [Validators.required , Validators.pattern(GlobalConstnts.emailRegex)]]
    });
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
     this.data = {
      email : formData.email
    }
    console.log(formData.email+ "this is formdata-email");
    console.log(this.data.email+"<<<<<<<<<<<<inside handle submit")
    this.userService.forgotPassword(this.data , this.token).subscribe((response: any)=>{
    
      this.ngxService.stop()
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbarService.openSnackBar(this.responseMessage , "")
    } , (error) =>{
      this.ngxService.stop();

      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstnts.genericError;
      }

      this.snackbarService.openSnackBar(this.responseMessage , GlobalConstnts.error)

    })
  }

}
