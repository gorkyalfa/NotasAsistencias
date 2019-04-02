import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaRoutingModule } from './nota-routing.module';
import { NotaComponent } from './nota.component';

@NgModule({
    imports: [CommonModule, NotaRoutingModule],
    declarations: [NotaComponent]
})
export class NotaModule {}
