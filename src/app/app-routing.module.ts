import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipeCompComponent } from './pipe-comp/pipe-comp.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes', 
    // loadChildren: './recipes/recipes.module#RecipesModule'  
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
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
