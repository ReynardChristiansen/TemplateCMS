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
import { MasterGroupsService } from '../../../services/api/master-groups/master-groups.service';

type CardColor = {
  color: string
  textColor?: string
}

interface UserData{
  username: string;
  nama: string;
  ldap: string;
  status: string;
  group : string;
};

interface User{
  nama: string;
  sts: string;
  group: string;
}

interface Group{
  nama: string;
  id: string;
}

@Component({
  selector: 'app-user-group-add',
  standalone: true,
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, NgTemplateOutlet, CardTitleDirective, CardTextDirective, ButtonDirective, CardSubtitleDirective, CardLinkDirective, RouterLink, ListGroupDirective, ListGroupItemDirective, CardFooterComponent, BorderDirective, CardGroupComponent, GutterDirective, CardImgDirective, TabsComponent, TabsListComponent, IconDirective, TabDirective, TabsContentComponent, TabPanelComponent, FormsModule, CommonModule, NgSelectModule, ReactiveFormsModule],
  templateUrl: './user-group-add.component.html',
  styleUrl: './user-group-add.component.scss'
})
export class UserGroupAddComponent {
  index : any
  selectedGroupValue: boolean = false;
  datauser: UserData[] = [];
  dataArray :any;
  userForm : FormGroup;
  isConfirming: boolean = false;
  isLoading:boolean = false;
  databaru! : User;
  optionsGroup : Group[] = [];
  filteredoptionsGroup : Group[] = [];
  selectedGroup: any[] = [];

    constructor(private route: ActivatedRoute, private dataService: DataService, private router:Router, private fb: FormBuilder, private groups : MasterGroupsService, private users: MasterGroupsService) {
    this.userForm = this.fb.group({
      fullname: [''],
      ldap: [''],
      username: [''], 
      password: [''],
      groups: [[]], 
    });
  }

  async ngOnInit(){
    await this.listGroups();
  }

  async listGroups(){
    await this.groups.getDataGroupMenu().subscribe(
      (response:any) => {
        this.optionsGroup = response;
        this.filteredoptionsGroup = [...this.optionsGroup];
        console.log(this.filteredoptionsGroup);
      },
      (error:any) => {
        console.error('Error fetching data', error);
      }
    );    
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    this.filteredoptionsGroup = this.optionsGroup.filter(function (d) {
      return d.nama.toLowerCase().includes(val) || !val;
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
    const group = this.selectedGroup.join(', ');
    this.databaru = {
      nama: this.userForm.value.fullname,
      sts: "0",
      group: group,
    };
    await this.users.addNewData(this.databaru).subscribe(
      (response:any) => {
        this.isConfirming = false;
        this.isLoading = false;
        this.router.navigate(['/administrator/user-group']);
      },
      (error:any) => {
        console.error('Error fetching data', error);
      }
    );    
    
  }
  cancelFunction(){
    this.router.navigate(['/administrator/user-group']);
  }
}
