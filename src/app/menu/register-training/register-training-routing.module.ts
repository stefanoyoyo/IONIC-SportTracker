import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTrainingComponent } from './register-training.component';

const routes: Routes = [
  {
    path:'',
    component: RegisterTrainingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterTrainingRoutingModule { }
