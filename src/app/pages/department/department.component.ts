import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})

export class DepartmentComponent implements OnInit{
  
  
  masterService = inject(MasterService);
  fb = inject(FormBuilder);
  deptList: any[] = [];
  isEditable:boolean = false;
  deptForm:any;

  ngOnInit(): void {
    this.getDept();
    this.deptForm = this.fb.group({
      deptId:[0],
      deptName:["",Validators.required],
      createdDate:["",Validators.required]
    });
  }

  resetForm(){
    this.deptForm.reset({deptId:0});
  }

// cancel button uses this
  setEditable(value:boolean) {
    this.isEditable = value;
    if(!this.isEditable){
      this.resetForm();
    }
  }
  getDept(){
    this.masterService.getAllDept().subscribe((res:any)=>{
      this.deptList = res.data;
    });
  }

  onEdit(deptObj:any){
    this.isEditable = true;
    const date = new Date(deptObj.createdDate).toISOString().split("T")[0];
    this.deptForm.patchValue({deptId:deptObj.deptId,deptName:deptObj.deptName, createdDate:date});
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure you want to delete this department?");
    if(isDelete){
      this.masterService.deleteDeptById(id).subscribe((res:any)=>{
        if(res.result){
          alert("Dept Deleted Success");
          this.getDept();
        }
        else{
          alert(res.message);
        }
      });
    }
    
  }

  saveDept(){
    // console.log(this.deptForm.value);
    if(this.deptForm.valid){
      
      if(this.isEditable){
        this.masterService.updateDept(this.deptForm.value).subscribe((res:any)=>{
          if(res.result){
            alert("Department updated success");
            this.setEditable(!this.isEditable);
            this.getDept();
          }
          else{
            alert(res.message);
          }
        });
        console.log(this.deptForm.value);
      }else{
        this.masterService.createNewDept(this.deptForm.value).subscribe((res:any)=>{
          if(res.result){
            alert("Department created success");
            this.getDept();
          }
          else{
            alert(res.message);
          }
        });
      }
      
    }
    
  }

}
