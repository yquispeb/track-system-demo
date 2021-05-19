import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutenticadorService } from '../services/autenticador.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  isCollapsed: boolean;
  isLogin: boolean= false;
  constructor(private authService: AutenticadorService) { }
  
  private userSubscription: Subscription
  
  ngOnInit(): void {
    this.isLogin=false;
    this.isCollapsed = true;
    this.userSubscription= this.authService.user.subscribe( user =>{
      this.isLogin= !!user;
    });
    
    console.log(this.isLogin);
  }
  
  onLoadPage() {
    this.isCollapsed = true;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  
  
}
