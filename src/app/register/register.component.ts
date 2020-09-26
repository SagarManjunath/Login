import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
submitted = false;
users: any[];
msg:string;
  constructor(
    private formBuilder : FormBuilder, 
    public myRouter: Router   
  //  private userServie: UserService
  ) { }

  ngOnInit() {
    this.registerForm =this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.pattern('[^@]*@[^@]*')]],
      password:['',Validators.required]
    })
    this.users=JSON.parse(localStorage.getItem('users')) || [];
  }

 

  register(){
    this.submitted=true;
    //checking whether form is valid or not
    if(this.registerForm.invalid){
      return;
    }
    let newUser=this.registerForm.value;
    if(this.ValidateUserExistance(this.registerForm.value.email)){
      this.msg='user already registered';
    }
    else{
      this.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.msg='user registered successfully';
      alert('User registered successfully ')
     // this.NavigaterToLogin();
     this.myRouter.navigate(['/login']);
    }
  }

  ValidateUserExistance(UserEmail){
    let duplicateUser = this.users.filter(user => { return user.email === UserEmail; }).length;
    if (duplicateUser) {
        return true;
    }
    else{
      return false;
    }
  }

  NavigaterToLogin(){
    setTimeout(function(){ 
    //  alert('please login')
      this.myRouter.navigate(['/login']);
     },3000);
  }

}
