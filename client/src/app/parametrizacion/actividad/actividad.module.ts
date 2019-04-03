import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActividadRoutingModule } from './actividad-routing.module';
import { ActividadComponent } from './actividad.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ActividadComponent],
  imports: [CommonModule, ActividadRoutingModule, FormsModule, NgxSpinnerModule]
})
export class ActividadModule {}
