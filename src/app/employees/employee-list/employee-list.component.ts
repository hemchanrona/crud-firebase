import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];
  constructor(
    public empService: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        // return {
        //   id: item.payload.doc.id,
        //   data: item.payload.doc.data()
        // } as object as Employee;
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as object
        } as Employee;
      });
      console.log(this.list);
    });
  }

  onEdit(emp: Employee) {
    this.empService.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.firestore.doc('employees/' + id).delete();
      this.toastr.warning('Deleted successfully', 'EMP. Register');
    }
  }

}
