import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JetFlyoverComponent } from './components/jet-flyover/jet-flyover.component';

const routes: Routes = [
  {path: '', component: JetFlyoverComponent},
  {path: ':jetKey', component: JetFlyoverComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
