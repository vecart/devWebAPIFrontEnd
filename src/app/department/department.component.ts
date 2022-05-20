import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private http:HttpClient) { }

  departments: any=[];

  //LifeCycle method that is executed when component is in scope
  ngOnInit(): void {
    this.refreshList();
  }

  //GET Department API Method
  //If res is available, the data will be assigned to the departments array
  refreshList() {
    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
    });
  }

}
