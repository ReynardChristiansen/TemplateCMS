import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BorderDirective, ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, ColComponent, GutterDirective, ListGroupDirective, ListGroupItemDirective, RowComponent, TabDirective, TabPanelComponent, TabsComponent, TabsContentComponent, TabsListComponent, TextColorDirective } from '@coreui/angular';
import { DataService } from '../../../services/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MasterUsersService } from '../../../services/api/master-users/master-users.service';

interface UserData{
  id : number;
  username: string;
  nama: string;
  ldap: boolean;
  status: number;
};

@Component({
  selector: 'app-user',
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
    TabPanelComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})


export class UserComponent {
  datauser2: UserData[] = [];
  datauser: UserData[] = [];
  @Output() dataEmitter = new EventEmitter<any>();
  datadata :UserData[] = [];

  public icons!: [string, string[]][];
  constructor(
    private route: ActivatedRoute, public iconSet: IconSetService, private router:Router, private dataService:DataService, private masters: MasterUsersService, private http: HttpClient
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
    {prop:'username'}, {name:'nama'}, {name: 'ldap'}, {name: 'status'}
  ]
  
  filteredDatauser = [...this.datauser2];
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.datauser2.filter(function (d) {
      return (
        d.nama.toLowerCase().includes(val) || 
        // d.ldap.toLowerCase().includes(val) ||
        // d.status.toLowerCase().includes(val) || 
        d.username.toLowerCase().includes(val)
      );
    });
  
    this.datauser = temp;
  }
  onLimitChange(event: any) {
    this.rowsPerPage = event.target.value;
  }

  editUser(event: number, username: String) {
    const temp = {
      index: event,
      username: username
    }
    this.dataService.setData(temp);
    this.router.navigate(['/administrator/user-edit']);
  }

  addNewUser(){
    this.router.navigate(['/administrator/addnewuser']);
  }


  async activateButton(username:any){
    const index = this.datauser2.findIndex(user => user.username === username);
    if(index !== -1)
    {
      const temp = (this.datauser2[index].id).toString();
      await this.masters.stsupdt(temp).subscribe(
        (response:any) => {
          this.loadData(); 
        },
        (error:any) => {
          console.error('Error fetching data', error);
        }
      );   
    }
    else
    {
      console.error('Error Index');
    }
  }
}
