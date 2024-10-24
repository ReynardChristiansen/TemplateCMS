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
  selector: 'app-user-group-edit',
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, NgTemplateOutlet, CardTitleDirective, CardTextDirective, ButtonDirective, CardSubtitleDirective, CardLinkDirective, RouterLink, ListGroupDirective, ListGroupItemDirective, CardFooterComponent, BorderDirective, CardGroupComponent, GutterDirective, CardImgDirective, TabsComponent, TabsListComponent, IconDirective, TabDirective, TabsContentComponent, TabPanelComponent, FormsModule, CommonModule, NgSelectModule, ReactiveFormsModule],
  templateUrl: './user-group-edit.component.html',
  styleUrl: './user-group-edit.component.scss'
})
export class UserGroupEditComponent {
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
      this.router.navigate(['/administrator/user-group']);
    }
    this.index = ds.index;
    this.username = ds.username;

    if(this.index == null){
      this.router.navigate(['/administrator/user-group']);
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
    await this.groups.getDataGroupMenu ().subscribe(
      (response:any) => {
        this.optionsGroup = response;
        this.filteredoptionsGroup = [...this.optionsGroup];
      },
      (error:any) => {
        console.error('Error fetching data', error);
      }
    );    
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

  async loadData(index: number) {
    await this.groups.getDataById(index.toString()).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.dataArray = response[0];
  
          this.dataArray.group = this.dataArray.group !== "null" && this.dataArray.group ? this.dataArray.group : "";
  
          this.selectedGroup = this.dataArray.group ? this.dataArray.group.split(',').map(Number) : [];
  
          this.userForm.patchValue({
            fullname: this.dataArray.nama || '',
            ldap: parseInt(this.dataArray.ldap, 10) || 0,
            username: this.dataArray.username || '',
          });
  
          this.userForm.get('groups')?.setValue(this.selectedGroup);
        } else {
          this.router.navigate(['/administrator/user-group']);
        }
      },
      (error: any) => {
        console.error('Error fetching data', error);
        this.router.navigate(['/administrator/user-group']);
      }
    );
  }
  
  cancelFunction(){
    this.router.navigate(['/administrator/user-group']);
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    this.filteredoptionsGroup = this.optionsGroup.filter(function (d) {
      return d.text.toLowerCase().includes(val) || !val;
    });
  }

  openConfirmation() {
    this.isConfirming = true;
  }

  cancelSubmit() {
    this.isConfirming = false;
  }

  async submitFunction() {
    this.isLoading = true;
    
    // Format the group data correctly
    const groups = this.userForm.value.groups.map(String).join(', ');
  
    const dataFetch = {
      id: this.dataArray.id.toString(),
      nama: this.userForm.value.fullname,
      group: groups,
    };
  
  
  
    await this.groups.updateData(JSON.stringify(dataFetch)).subscribe(
      (response: any) => {
        this.router.navigate(['/administrator/user-group']);
      },
      (error: any) => {
        console.error('Error updating data', error);
        this.isLoading = false;
      }
    );
  }

  convertGroupToString(): string {
    return this.selectedGroup.join(', ');
  }



}
