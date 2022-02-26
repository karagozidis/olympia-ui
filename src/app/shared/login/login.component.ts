import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {PersonService} from '../../services/crud/person.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  focus;
  focus1;
  focus2;
  test: Date = new Date();
  private toggleButton;
  private sidebarVisible: boolean;

  username = 'admin';
  password = 'adminadmin';

  constructor(private element: ElementRef,
              private service: PersonService,
              private router: Router) {
    this.sidebarVisible = false;
  }

  authenticateUser(): void {

    if (this.username === '') {
     // this.notificationService.showNotification
      // ('top', 'center', 'alert-danger', 'fa-id-card', '<b>Login Error</b> Please fill in your username');
      alert('Login Error. Please fill in your username');
      return;
    }

    if (this.password === '') {
      alert('Login Error. Please fill in your password');
     // this.notificationService.showNotification
      // ('top', 'center', 'alert-danger', 'fa-id-card', '<b>Login Error</b> Please fill in your password');
      return;
    }

    this.service.login(this.username, this.password).subscribe(
        data => {
          localStorage.setItem('login_data', data);
          localStorage.setItem('token', data['token']);
          localStorage.setItem('refreshToken', data['refreshToken']);
          this.router.navigateByUrl('/dashboard');
        },
        err => {
          if ( err.status === 401) {
            alert('Login Error. Wrong Username or Password.');
          }

          if ( err.status === 408) {
            alert('Login Error. Cannot find Server.');
          }
        }
    );
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

  sidebarToggle() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    const sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible === false) {
      setTimeout(function() {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
}
