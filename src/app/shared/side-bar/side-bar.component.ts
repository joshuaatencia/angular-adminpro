import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {

  menuItems:any[];

  constructor(private sidebarServices:SidebarService) {
    this.menuItems = this.sidebarServices.menu;
   }

  ngOnInit(): void {
  }

}
