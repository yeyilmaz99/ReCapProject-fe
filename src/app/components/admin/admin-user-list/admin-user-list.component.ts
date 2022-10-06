import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  users:User[] = [];
  dataLoaded:boolean = false;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }


  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
      this.dataLoaded = true;
    })
  }
}
