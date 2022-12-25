import { Component, OnInit } from '@angular/core';
import { ActiveUser } from 'src/app/models/activeUser';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  activeUsers:ActiveUser[] = [];
  users:User[] = [];
  dataLoaded:boolean = false;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.getActiveUsers();
    this.getAllUsers();
  }


  getActiveUsers(){
    this.userService.getActiveUsers().subscribe(response => {
      this.activeUsers = response.data;
      this.dataLoaded = true;
    })
  }


  getAllUsers(){
    this.userService.getAllUsers().subscribe(response => {
      this.users = response.data;
      this.dataLoaded = true;
    })
  }

  delete(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }




}
