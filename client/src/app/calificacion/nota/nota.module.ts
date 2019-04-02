import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotaRoutingModule } from './nota-routing.module';
import { NotaComponent } from './nota.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [NotaComponent],
  imports: [CommonModule, FormsModule, NotaRoutingModule, NgxSpinnerModule]
})
export class NotaModule {}
