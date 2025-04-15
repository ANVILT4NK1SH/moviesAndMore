import { CommonModule, NgClass } from "@angular/common";

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, NgClass],
  exports: [CommonModule, FormsModule, NgClass]
})

export class SharedModule{

}