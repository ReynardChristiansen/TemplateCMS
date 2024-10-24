import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule, CommonModule]
})

export class LoginComponent {

  loginForm: FormGroup;
  formFailed:boolean=false;
  formFailedText:string="Form Tidak Valid";

  constructor(
    private fb: FormBuilder, 
    private kukis: CookieService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Hardcoded dengan validator
      password: ['', Validators.required]  // Hardcoded dengan validator
    });
  }
  ngOnInit():void {
    this.getUserCodeFromCookie();
  }
  getUserCodeFromCookie() {
    const csrf = this.kukis.get('data_csrf_cookies');
    if (csrf) {
      this.router.navigate(['/dashboard']);
    }
  }
  cookieSet(username:string){
    const dataCookies = {
      username: username
    };
    const jsonCookies = JSON.stringify(dataCookies);
    const base64Cookies = btoa(jsonCookies);
    return base64Cookies;
  }

  onLoginClick() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      if(username == "20180308" && password == "Mobile123+"){
        this.formFailed=false
        
        //dibuat karena ada request untuk CRUD ke local storage browser
        // this.savetoLocalBrowserStorage();

        const now = new Date();
        now.setTime(now.getTime()+(90*60*1000));//dalam milisecond (time*60second*1000)
        const data_csrf_cookies = this.cookieSet(username); 
        this.kukis.set('data_csrf_cookies', data_csrf_cookies, now);

        this.router.navigate(['/dashboard']);
      }
      else
      {
        this.formFailed=true;
        console.error("Invalid Credentials")
      }
    } else {
      console.error("Invalid Form")
    }
  }

  //dibuat karena request untuk simpan di local storage browser
  // datauser = [
  //   {
  //     "username"  : "testuser",
  //     "nama"      : "test",
  //     "ldap"      : "Y",
  //     "status"    : "N",
  //     "group"     : "1, 2, 3"
  //   },
  //   {
  //     "username"  : "test123",
  //     "nama"      : "test123",
  //     "ldap"      : "Y",
  //     "status"    : "N",
  //     "group"     : "2, 3"
  //   },
  //   {
  //     "username"  : "nonldap",
  //     "nama"      : "non ldap",
  //     "ldap"      : "N",
  //     "status"    : "Y",
  //     "group"     : "1, 3"
  //   },
  //   {
  //     "username"  : "20180308",
  //     "nama"      : "Ahmad Faisal test",
  //     "ldap"      : "Y",
  //     "status"    : "Y",
  //     "group"     : ""
  //   },
  //   {
  //     "username"  : "20160553",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "1"
  //   },
  //   {
  //     "username"  : "20160554",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "3"
  //   },
  //   {
  //     "username"  : "20160555",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "1"
  //   },
  //   {
  //     "username"  : "20160556",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "2"
  //   },
  //   {
  //     "username"  : "20160557",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "2"
  //   },
  //   {
  //     "username"  : "20160558",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "Y",
  //     "status"    : "N",
  //     "group"     : "1"
  //   },
  //   {
  //     "username"  : "20160559",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "3"
  //   },
  //   {
  //     "username"  : "20160560",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "2"
  //   },
  //   {
  //     "username"  : "20160551",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "1"
  //   },
  //   {
  //     "username"  : "20160552",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "1"
  //   },
  //   {
  //     "username"  : "20160561",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "1,3"
  //   },
  //   {
  //     "username"  : "20160562",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "1,2,3"
  //   },
  //   {
  //     "username"  : "20160563",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "1,2"
  //   },
  //   {
  //     "username"  : "20160564",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "1"
  //   },
  //   {
  //     "username"  : "20160565",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "1,3"
  //   },
  //   {
  //     "username"  : "20160566",
  //     "nama"      : "test hta 3",
  //     "ldap"      : "N",
  //     "status"    : "N",
  //     "group"     : "2"
  //   },
  // ]

  // optionsGroup = [
  //   { value: 1, text: 'Administrator', groups: '1,2' },
  //   { value: 2, text: 'User', groups:'2' },
  //   { value: 3, text: 'Manager', groups:'1' }
  // ];
  
  // savetoLocalBrowserStorage(){
  //   const array = {username: "2018" }
  //   const json = JSON.stringify(array);
  //   const base64 = btoa(json); 
  //   localStorage.setItem('data', base64);
  // }

}
