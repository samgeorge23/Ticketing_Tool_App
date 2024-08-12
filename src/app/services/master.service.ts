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
}
