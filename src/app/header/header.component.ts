import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SupplierDataService } from '../services/supplier.data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  isCollapsed: boolean;
  enableUser: boolean;
  constructor(private supplierDataService: SupplierDataService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.enableUser=this.supplierDataService.isEnabled();
  }


  ngOnInit(): void {
    this.isCollapsed = true;
  }

  onLoadPage(){
    this.isCollapsed = true;
    
  }
  

}
