import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl:string = "https://freeapi.gerasim.in/api/TicketsNew/";

  constructor(private httpClient: HttpClient) { }

  login(userCredentialObj:any){
    return this.httpClient.post(this.apiUrl+"Login",userCredentialObj);
  }

  getAllDept(){
    return this.httpClient.get(this.apiUrl+"GetDepartments");
  }

  createNewDept(obj:any){
    return this.httpClient.post(this.apiUrl+"CreateDepartment",obj);
  }

  updateDept(obj:any){
    return this.httpClient.put(this.apiUrl+"UpdateDepartment",obj);
  }

  deleteDeptById(id:number){
    return this.httpClient.delete(this.apiUrl+`DeleteDepartment?id=${id}`);
  }

  getAllPCategory(){
    return this.httpClient.get(this.apiUrl+"GetParentCategory");
  }

  createNewPCategory(obj:any){
    return this.httpClient.post(this.apiUrl+"CreateParentCategory",obj);
  }

  updatePCategory(obj:any){
    return this.httpClient.put(this.apiUrl+"UpdateParentCategory",obj);
  }

  deletePCategoryById(id:number){
    return this.httpClient.delete(this.apiUrl+`DeleteParentCategory?id=${id}`);
  }

  getAllCCategory(){
    return this.httpClient.get(this.apiUrl+"GetChildCategory");
  }

  createNewCCategory(obj:any){
    return this.httpClient.post(this.apiUrl+"CreateChildCategory",obj);
  }

  updateCCategory(obj:any){
    return this.httpClient.put(this.apiUrl+"UpdateChildCategory",obj);
  }

  deleteCCategoryById(id:number){
    return this.httpClient.delete(this.apiUrl+`DeleteChildCategory?id=${id}`);
  }

  getAllEmployee(){
    return this.httpClient.get(this.apiUrl+"GetEmployees");
  }

  createNewEmployee(obj:any){
    return this.httpClient.post(this.apiUrl+"CreateEmployee",obj);
  }

  updateEmployee(obj:any){
    return this.httpClient.put(this.apiUrl+"UpdateEmployee",obj);
  }

  deleteEmployeeById(id:number){
    return this.httpClient.delete(this.apiUrl+`DeleteEmployee?id=${id}`);
  }

  getAllRoles(){
    return this.httpClient.get(this.apiUrl+"GetAllRoles");
  }
}
