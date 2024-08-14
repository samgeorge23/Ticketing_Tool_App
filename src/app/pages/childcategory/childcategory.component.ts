import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-childcategory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './childcategory.component.html',
  styleUrl: './childcategory.component.css'
})
export class ChildcategoryComponent {
  masterService = inject(MasterService);
  fb = inject(FormBuilder);
  categoryList: any[] = [];
  categoryPList: any[] = [];
  isEditable:boolean = false;
  categoryForm:any;

  ngOnInit(): void {
    this.getCategory();
    this.getPCategory();
    this.categoryForm = this.fb.group({
      childCategoryId:[0],
      categoryName:["",Validators.required],
      parentCategoryId:["",Validators.required]
    });
  }

  resetForm(){
    this.categoryForm.reset({childCategoryId:0, parentCategoryId:""});
  }

// cancel button uses this
  setEditable(value:boolean) {
    this.isEditable = value;
    if(!this.isEditable){
      this.resetForm();
    }
  }
  getCategory(){
    this.masterService.getAllCCategory().subscribe((res:any)=>{
      this.categoryList = res.data;
    });
  }

  getPCategory(){
    this.masterService.getAllPCategory().subscribe((res:any)=>{
      this.categoryPList = res.data;
    });
  }

  onEdit(categoryObj:any){
    this.isEditable = true;
    let parentCategoryId = 0;
    this.categoryPList.forEach((pCategory:any)=>{
      if(pCategory?.categoryName === categoryObj.parentCategoryName){
        parentCategoryId = pCategory.categoryId;
      }
    });
    this.categoryForm.patchValue({childCategoryId:categoryObj.childCategoryId,categoryName:categoryObj.categoryName, parentCategoryId:parentCategoryId});
  }

  onDelete(categoryId:number){
    const isDelete = confirm("Are you sure you want to delete this department?");
    if(isDelete){
      this.masterService.deleteCCategoryById(categoryId).subscribe((res:any)=>{
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
        this.masterService.updateCCategory(this.categoryForm.value).subscribe((res:any)=>{
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
        this.masterService.createNewCCategory(this.categoryForm.value).subscribe((res:any)=>{
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
