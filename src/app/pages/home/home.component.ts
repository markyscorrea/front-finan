import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { Utils } from 'src/app/Utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/home/dashboard'
    },
    {
      title: 'Lançamentos',
      icon: 'repeat-outline',
      link: '/home/lancamentos'
    },
    {
      title: 'Categorias',
      icon: 'bookmark-outline',
      link: '/home/categorias'
    },
    {
      title: 'Pessoas',
      icon: 'people-outline',
      link: '/home/pessoas'
    }
  ];

  logout: NbMenuItem[] = [
    {
      title: 'Logout',
      icon: 'log-out-outline',
    }
  ];

  title: string = '';

  constructor(
    private router: Router  
    ) { }

  ngOnInit(): void {
    this.verificaUrl()
  }

  logoutUser() {
    Utils.clearStorage()
    this.router.navigate(['/login']);
  }

  verificaUrl(){
    const url = this.router.routerState.snapshot.url
    if(url == '/home/lancamentos'){
      this.title = 'Lançamentos'
    }else if(url == '/home/categorias'){
      this.title = 'Categorias'
    }else if(url == '/home/pessoas'){
      this.title = 'Pessoas'
    }else if(url == '/home/dashboard'){
      this.title = 'Dashboard'
    }
  }
}
