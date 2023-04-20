import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AddEditUsersComponent } from './components/add-edit-users/add-edit-users.component';



const routes: Routes = [
  
  {path:'user',component:ListUsersComponent},
  {path:'user/add',component:AddEditUsersComponent},
  {path:'user/edit/:idUser',component:AddEditUsersComponent},
  {path:'**',redirectTo:'',pathMatch:'full'} //Este siempre el ultimo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
