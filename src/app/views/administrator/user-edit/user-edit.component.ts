import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  BorderDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardGroupComponent,
  CardHeaderComponent,
  CardImgDirective,
  CardLinkDirective,
  CardSubtitleDirective,
  CardTextDirective,
  CardTitleDirective,
  ColComponent,
  GutterDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  RowComponent,
  TabDirective,
  TabPanelComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TextColorDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataService } from '../../../services/data.service';
import { MasterUsersService } from '../../../services/api/master-users/master-users.service';
import { MasterGroupsService } from '../../../services/api/master-groups/master-groups.service';

interface UserData{
  id : number;
  username: string;
  nama: string;
  password:string;
  ldap: number;
  status: number;
  group : string;
};

interface Group{
  nama: string;
  id: string;
}


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, NgTemplateOutlet, CardTitleDirective, CardTextDirective, ButtonDirective, CardSubtitleDirective, CardLinkDirective, RouterLink, ListGroupDirective, ListGroupItemDirective, CardFooterComponent, BorderDirective, CardGroupComponent, GutterDirective, CardImgDirective, TabsComponent, TabsListComponent, IconDirective, TabDirective, TabsContentComponent, TabPanelComponent, FormsModule, CommonModule, NgSelectModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent{
  index: number;
  username: String;
  selectedGroupValue: boolean = false;
  dataArray: any;
  dataBaru: UserData = { id: 0, username: '', nama: '', password: '', ldap: 0, status: 0, group: '' };
  userForm: FormGroup;
  isConfirming: boolean = false;
  isLoading: boolean = false;

  optionsGroup: any[] = [];
  filteredoptionsGroup: any[] = [];
  selectedGroup: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService, 
    private router: Router, 
    private fb: FormBuilder,
    private user: MasterUsersService,
    private groups: MasterGroupsService
  ) {
    const ds = this.dataService.getData();
    if(this.dataService.getData() == undefined){
      this.router.navigate(['/administrator/user']);
    }
    this.index = ds.index;
    this.username = ds.username;

    if(this.index == null){
      this.router.navigate(['/administrator/user']);
    }
    this.listGroups();
    this.loadData(this.index);
    // Initialize form
    this.userForm = this.fb.group({
      fullname: [''],
      ldap: [''],
      username: [''], 
      password: [''],
      groups: [[]], 
    });
  }

  async listGroups(){
    await this.groups.getData().subscribe(
      (response:any) => {
        this.optionsGroup = response;
        this.filteredoptionsGroup = [...this.optionsGroup];
      },
      (error:any) => {
        console.error('Error fetching data', error);
      }
    );    
  }

  async loadData(index:number){
    await this.user.getDataById((index).toString()).subscribe(
      (response:any) => {
        this.dataArray = response[0];
        if(response[0].group == "null"){
          this.dataArray.group = "";
        }
        this.selectedGroup = this.dataArray.group ? this.dataArray.group.split(', ').map(Number) : []; 
        this.userForm.patchValue({
          fullname: this.dataArray.nama,
          ldap: parseInt(this.dataArray.ldap, 10),
          username: this.dataArray.username,
        });
        
        this.userForm.get('groups')?.setValue(this.selectedGroup);
        if(response.status == "error"){
          this.router.navigate(['/administrator/user']);
        }
      },
      (error:any) => {
        console.error('Error fetching data', error);
        this.router.navigate(['/administrator/user']);

      }
    );   
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    this.filteredoptionsGroup = this.optionsGroup.filter(function (d) {
      return d.text.toLowerCase().includes(val) || !val;
    });
  }

  onCheckboxChange(value: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
        this.selectedGroup.push(value);
    } else {
        const index = this.selectedGroup.indexOf(value);
        if (index > -1) {
            this.selectedGroup.splice(index, 1);
        }
    }
  }

  openConfirmation() {
    this.isConfirming = true;
  }

  cancelSubmit() {
    this.isConfirming = false;
  }


  async submitFunction() {
    this.isLoading = true;
    // id : number;
    // username: string;
    // nama: string;
    // ldap: number;
    // status: number;
    // group : string;
    const dataFetch = {
      // "id": "29", "updatedby": "1", "userLogin": "testtest5", "nama": "test5", "userPass": "test123123", "isLDAP": "1", "sts": "0", "group": "2"
      id: this.dataArray.id.toString(),
      updatedby: "1",
      userLogin: this.dataArray.username,
      nama: this.userForm.value.fullname,
      isLDAP: this.userForm.value.ldap.toString(),
      sts: this.dataArray.status.toString(),
      group : this.userForm.value.groups.join(', '),
      userPass: ""
    }
    if(this.userForm.value.password == ""){
      dataFetch.userPass = this.dataArray.password;
    }else{
      dataFetch.userPass = this.userForm.value.password;
    }
    await this.user.updateData(JSON.stringify(dataFetch)).subscribe(
      (response:any) => {
        this.router.navigate(['/administrator/user']);
      },
      (error:any) => {
        console.error('Error fetching data', error);
        this.isLoading = false
      }
    );

  }
  
  cancelFunction(){
    this.router.navigate(['/administrator/user']);
  }

  convertGroupToString(): string {
    return this.selectedGroup.join(', ');
  }

  //dibuat karena ada request untuk CRUD ke local storage browser
  readFromLocalStorage(){
    const base64  = localStorage.getItem('data');
    if (base64) {
      const stringData = atob(base64);
      const jsonData = JSON.parse(stringData);
      return jsonData;
    } else {
      console.error('No data found in localStorage.');
    }
  }
  // savetoLocalBrowserStorage(){
  //   const array = {datauser: this.temp, optionsGroup:this.optionsGroup  }
  //   const json = JSON.stringify(array);
  //   const base64 = btoa(json); 
  //   localStorage.setItem('data', base64);
  // }

}
