import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileSearchComponent } from './mobile-search.component';

const routes: Routes = [
  {path:'',component:MobileSearchComponent, data: { animation: 'enterLeavePage' },}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileSearchRoutingModule { }
