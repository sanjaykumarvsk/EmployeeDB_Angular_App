export class EmployeeDetailsModel{
   empID: number;
   name: string;
   city: string;
   state: string;
   emailID: string;
   contactNo: string;
   address: string;
   pinCode: string;


   constructor(){
    this.empID = 1;
    this.name = '';
    this.city = '';
    this.state = '';
    this.emailID = '';
    this.contactNo = '';
    this.address = '';
    this.pinCode = '';
   }
}