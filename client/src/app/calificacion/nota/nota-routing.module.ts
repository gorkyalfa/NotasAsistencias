import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotaComponent } from './nota.component';

const routes: Routes = [
    {
        path: '',
        component: NotaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotaRoutingModule {}
