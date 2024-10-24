import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BorderDirective, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, ColComponent, GutterDirective, ListGroupDirective, ListGroupItemDirective, RowComponent, TabDirective, TabPanelComponent, TabsComponent, TabsContentComponent, TabsListComponent, TextColorDirective } from '@coreui/angular';
import { DataService } from '../../../services/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MasterGroupsService } from 'src/app/services/api/master-groups/master-groups.service';

interface UserData{
  id : number;
  nama: string;
};

@Component({
  selector: 'app-user-group',
  standalone: true,
  imports: [
    NgxDatatableModule,
    CommonModule,
    IconDirective,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    NgTemplateOutlet,
    CardTitleDirective,
    CardTextDirective,
    ButtonDirective,
    CardSubtitleDirective,
    CardLinkDirective,
    RouterLink,
    ListGroupDirective,
    ListGroupItemDirective,
    CardFooterComponent,
    BorderDirective,
    CardGroupComponent,
    GutterDirective,
    CardImgDirective,
    TabsComponent,
    TabsListComponent,
    IconDirective,
    TabDirective,
    TabsContentComponent,
    TabPanelComponent,
  ],
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss'],
})
export class UserGroupComponent {
  datauser2: UserData[] = [];
  datauser: UserData[] = [];
  @Output() dataEmitter = new EventEmitter<any>();
  datadata :UserData[] = [];

  public icons!: [string, string[]][];
  constructor(
    private route: ActivatedRoute, public iconSet: IconSetService, private router:Router, private dataService:DataService, private masters: MasterGroupsService, private http: HttpClient
  ) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  async ngOnInit() {
    await this.loadData();
    
    const path = this.route?.routeConfig?.path;
    let prefix = 'cil';
    this.icons = this.getIconsView(prefix);
  }

  
  async loadData() {
    await this.masters.getData().subscribe(
      (response:any) => {
        this.datadata = response;
        this.datauser2 = this.datadata;
        this.datauser   = this.datauser2;
      },
      (error:any) => {
        console.error('Error fetching data', error);
      }
    );    
  } 

  getIconsView(prefix: string) {
    return Object.entries(this.iconSet.icons).filter((icon) => {
      return icon[0].startsWith(prefix);
    });
  }
  ColumnMode = ColumnMode;
  filterValue: string = '';
  rowsPerPage = 10;
  offset = 0;
  rowOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  columns = [
    {name:'nama'}, {name: 'ldap'}
  ]

  filteredDatauser = [...this.datauser2];
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    console.log(val);
    const temp = this.datauser2.filter(function (d) {
      return (
        d.nama.toLowerCase().includes(val)
      );
    });
  
    this.datauser = temp;
  }

  onLimitChange(event: any) {
    this.rowsPerPage = event.target.value;
  }



  savetoLocalBrowserStorage(){
    const array = {datauser: this.datauser, optionsGroup:this.datauser2  }
    const json = JSON.stringify(array);
    const base64 = btoa(json); 
    localStorage.setItem('data', base64);
  }

  editUser(event: number) {
    const temp = {
      index: event,
    }
    this.dataService.setData(temp);
    this.router.navigate(['/administrator/user-group-edit']);
  }

  async deleteUser(event: number) {
    const dataFetch = {
      id: event
    };

    await this.masters.deleteData(JSON.stringify(dataFetch)).subscribe(
      (response: any) => {
        this.router.navigate(['/administrator/user-group']);
      },
      (error: any) => {
        console.error('Error updating data', error);
      }
    );

    this.loadData();
  
  }
  

  addUserGroup() {
    this.router.navigate(['/administrator/user-group-add']);
  }


}
