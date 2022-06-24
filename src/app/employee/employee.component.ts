import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http:HttpClient) { }

  departments: any=[];
  employees: any=[];

  modalTitle = "";
  EmployeeId = 0;
  EmployeeName = "";
  Department = "";
  DateOfJoining = "";
  PhotoFileName = "anonymous.jpg";
  PhotoPath = environment.PHOTO_URL;


  //LifeCycle method that is executed when component is in scope
  ngOnInit(): void {
    this.refreshList();
  }

  //GET Employee/Department API Method
  //If res is available, the data will be assigned to the departments array
  refreshList() {
    this.http.get<any>(environment.API_URL+'employee')
    .subscribe(data=>{
      this.employees=data;
    });

    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
    });

  }

  addClick(){
    this.modalTitle="Add Employee";
    this.EmployeeId=0;
    this.EmployeeName="";
    this.Department="";
    this.DateOfJoining="";
    this.PhotoFileName="anonymous.jpg";
  }

  editClick(emp:any){
    this.modalTitle="Edit Employee";
    this.EmployeeId= emp.EmployeeId;
    this.EmployeeName= emp.EmployeeName;
    this.Department= emp.Department;
    this.DateOfJoining= emp.DateOfJoining;
    this.PhotoFileName= emp.PhotoFileName;
  }

  createClick(){
    var val={
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName

    };

    //POST Method to add new department
    this.http.post(environment.API_URL+'employee',val).subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick(){
    var val={
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName
    };

    //PUT Method to update existing emplopyee based on given dept ID
    this.http.put(environment.API_URL+'employee',val).subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
      //DELETE Method after confirmation
      this.http.delete(environment.API_URL+'employee/'+id).subscribe(res=>{
        alert(res.toString());
        this.refreshList();
      });
    }
  }

}
