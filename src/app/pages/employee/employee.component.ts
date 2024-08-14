import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  masterService = inject(MasterService);
  fb = inject(FormBuilder);
  employeeList: any[] = [];
  roleList:any[] = [];
  deptList:any[] = [];
  isEditable:boolean = false;
  isCreate:boolean = false;
  employeeForm:any;

  ngOnInit(): void {
    this.getEmployees();
    this.getDept();
    this.getRoles();
    this.employeeForm = this.fb.group({
      employeeId:[0],
      employeeName:["",Validators.required],
      contactNo:["",Validators.required],
      emailId:["",Validators.required],
      deptId:["",Validators.required],
      password:["",Validators.required],
      gender:["",Validators.required],
      role:["",Validators.required]
    });
  }
  getRoles(){
    this.masterService.getAllRoles().subscribe((res:any)=>{
      this.roleList = res.data;
    });
  }

  getDept(){
    this.masterService.getAllDept().subscribe((res:any)=>{
      this.deptList = res.data;
    });
  }

  resetForm(){
    this.employeeForm.reset({employeeId:0});
  }

// cancel button uses this
  setEditable(value:boolean) {
    this.isEditable = value;
    this.isCreate = true;
    if(!this.isEditable){
      this.resetForm();
    }
  }
  getEmployees(){
    this.masterService.getAllEmployee().subscribe((res:any)=>{
      this.employeeList = res.data;
    });
  }

  onEdit(empObj:any){
    this.isEditable = true;
    this.isCreate = false;
    this.employeeForm.patchValue({employeeId:empObj.employeeId,employeeName:empObj.employeeName,contactNo:empObj.contactNo,emailId:empObj.emailId,deptId:empObj.deptId,password:empObj.password,gender:empObj.gender,role:empObj.role});
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure you want to delete this employee?");
    if(isDelete){
      this.masterService.deleteEmployeeById(id).subscribe((res:any)=>{
        if(res.result){
          alert("Employee Deleted Success");
          this.getEmployees();
        }
        else{
          alert(res.message);
        }
      });
    }
    
  }

  saveEmployee(){
    // console.log(this.employeeForm.value);
    if(this.employeeForm.valid){
      console.log(this.employeeForm.value);
      if(!this.isCreate){
        this.masterService.updateEmployee(this.employeeForm.value).subscribe((res:any)=>{
          if(res.result){
            alert("Employee updated success");
            this.setEditable(false);
            this.getEmployees();
          }
          else{
            alert(res.message);
          }
        });
        
      }else{
        this.masterService.createNewEmployee(this.employeeForm.value).subscribe((res:any)=>{
          if(res.result){
            alert("Employee created success");
            this.setEditable(false);
            this.getEmployees();
          }
          else{
            alert(res.message);
          }
        });
      }
      
    }
    
  }
}
