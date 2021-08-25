import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipeCompComponent } from './pipe-comp/pipe-comp.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/recipes',
  //   pathMatch: 'full'
  // },
  {
    path: 'pipe',
    component: PipeCompComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
