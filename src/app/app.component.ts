import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// import form module

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeDetailsModel } from './model/employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'angular_app';

  // initialise form name
  employeeForm: FormGroup = new FormGroup({});

  // to intialise value for a new form we need all the values incase of an object

  employeeObj: EmployeeDetailsModel = new EmployeeDetailsModel()
  employeeList:EmployeeDetailsModel[]=[];

  constructor(){
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parsedData = JSON.parse(oldData);
      this.employeeList = parsedData;
    }
  }

  // create a new form with this function
  createForm(){
    this.employeeForm = new FormGroup({
      empID: new FormControl(this.employeeObj.empID),
      name : new FormControl(this.employeeObj.name, [Validators.required]),
      city : new FormControl(this.employeeObj.city),
      state : new FormControl(this.employeeObj.state),
      emailID : new FormControl(this.employeeObj.emailID),
      contactNo : new FormControl(this.employeeObj.contactNo, [Validators.required, Validators.minLength(7)]),
      address : new FormControl(this.employeeObj.address),
      pinCode:  new FormControl(this.employeeObj.pinCode)
    })
  }

  // save form function

  onSave(){ 
     const oldData = localStorage.getItem("EmpData");

     if (oldData != null) {
        const parsedData = JSON.parse(oldData);
        this.employeeForm.controls['empID'].setValue(parsedData.length +1);
        this.employeeList.unshift(this.employeeForm.value);
     } else {
      this.employeeList.unshift(this.employeeForm.value);
     }
     localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
  }

  //Edit data

  onEdit(item:EmployeeDetailsModel){
     this.employeeObj = item;
     this.createForm()
  }

  // update data

  onUpdate(){
    const record = this.employeeList.find(employee => employee.empID == this.employeeForm.controls['empID'].value);
    
    if (record != undefined) {
      record.name = this.employeeForm.controls['name'].value;
      record.emailID = this.employeeForm.controls['emailID'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
      record.address = this.employeeForm.controls['address'].value;

    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.employeeObj = new EmployeeDetailsModel();
    this.createForm();
  }


  // Delete data

  onDelete(id:number){
    const isDelete = confirm("Are you sure you want to delete?");
    if(isDelete){
      const index = this.employeeList.findIndex(m => m.empID == id);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }

  //reset data
  resetData(){
    this.employeeObj = new EmployeeDetailsModel();
    this.createForm();
  }
}