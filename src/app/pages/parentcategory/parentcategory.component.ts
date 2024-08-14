import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-parentcategory',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,DatePipe],
  templateUrl: './parentcategory.component.html',
  styleUrl: './parentcategory.component.css'
})
export class ParentcategoryComponent {
  masterService = inject(MasterService);
  fb = inject(FormBuilder);
  categoryList: any[] = [];
  deptList: any[] = [];
  isEditable:boolean = false;
  categoryForm:any;

  ngOnInit(): void {
    this.getCategory();
    this.getDept();
    this.categoryForm = this.fb.group({
      categoryId:[0],
      categoryName:["",Validators.required],
      deptId:["",Validators.required]
    });
  }

  resetForm(){
    this.categoryForm.reset({categoryId:0, deptId:""});
  }

// cancel button uses this
  setEditable(value:boolean) {
    this.isEditable = value;
    if(!this.isEditable){
      this.resetForm();
    }
  }
  getCategory(){
    this.masterService.getAllPCategory().subscribe((res:any)=>{
      this.categoryList = res.data;
    });
  }

  getDept(){
    this.masterService.getAllDept().subscribe((res:any)=>{
      this.deptList = res.data;
    });
  }

  onEdit(categoryObj:any){
    this.isEditable = true;
    let deptId = 0;
    this.deptList.forEach((dept:any)=>{
      if(dept?.deptName === categoryObj.deptName){
        deptId = dept.deptId;
      }
    });
    this.categoryForm.patchValue({categoryId:categoryObj.categoryId,categoryName:categoryObj.categoryName, deptId:deptId});
  }

  onDelete(categoryId:number){
    const isDelete = confirm("Are you sure you want to delete this department?");
    if(isDelete){
      this.masterService.deletePCategoryById(categoryId).subscribe((res:any)=>{
        if(res.result){
          alert("Parent Category Deleted Success");
          this.getCategory();
        }
        else{
          alert(res.message);
        }
      });
    }
    
  }

  save(){
    // console.log(this.deptForm.value);
    if(this.categoryForm.valid){
      
      if(this.isEditable){
        this.masterService.updatePCategory(this.categoryForm.value).subscribe((res:any)=>{
          if(res.result){
            alert("Parent Category updated success");
            this.setEditable(!this.isEditable);
            this.getCategory();
          }
          else{
            alert(res.message);
          }
        });
        console.log(this.categoryForm.value);
      }else{
        this.masterService.createNewPCategory(this.categoryForm.value).subscribe((res:any)=>{
          if(res.result){
            alert("Parent Category created success");
            this.getCategory();
          }
          else{
            alert(res.message);
          }
        });
      }
      
    }
    
  }
}
