import { Component } from '@angular/core';
import { NavigationComponent } from "./navigation/navigation.component";
import { DisplayListComponent } from "./display-list/display-list.component";

@Component({
  selector: 'app-dashboard',
  imports: [NavigationComponent, DisplayListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
