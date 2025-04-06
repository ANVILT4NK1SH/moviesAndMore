import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';



@Component({
  selector: 'app-header',
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchInput = ''

  search(){
    if(this.searchInput.trim()) {
      
    }
  }
}
