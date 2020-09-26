import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewChecked  {
  @ViewChild('scrollMe',{static:false}) private myScrollContainer: ElementRef;
  submitted:boolean=false;
isLoginSuccess:boolean=false;
loginForm:FormGroup;
  users: any[];
  errmsg: string;

  constructor(
    private formBuilder: FormBuilder,
    public myRouter:Router
  ) { 


  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.pattern('[^@]*@[^@]*'),Validators.required]],
      password:['',Validators.required]
    })
    this.users=JSON.parse(localStorage.getItem('users')) || [];
    this.scrollToBottom();
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
}

  onSubmit(){
    this.submitted=true;
    if(this.loginForm.invalid){
      return;
    }
    console.log(this.loginForm.value);
    let loggedInUser=this.loginForm.value;
    // if logged in user email id and password matchs, then redirect to home page, else show error msg
    if(this.users.filter((a) => a['email'] ==loggedInUser.email && a['password']==loggedInUser.password).length==1){
      this.isLoginSuccess=true;
      this.errmsg="Login Sucess";
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      this.myRouter.navigate(['/home']);
    }
    else{
      this.errmsg="Email or password are incorrect"
      this.isLoginSuccess=false;
    }
    
   
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
