import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  
  loginForm:any;

  fb = inject(FormBuilder);
  masterService = inject(MasterService);
  router = inject(Router);

  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailId:["",Validators.required],
      password:["",Validators.required]
    });
  }

  onLogin(){
    this.masterService.login(this.loginForm.value).subscribe((res:any)=>{
      if(res.result){
        localStorage.setItem("ticketUser",JSON.stringify(res.data));
        this.router.navigateByUrl("/dashboard");
      }
      else{
        alert(res.message);
      }
    });
  }
}
