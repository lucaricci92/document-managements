import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents.component';
import { CreateEditComponent } from './create-edit/create-edit.component';

const routes: Routes = [
  { path: '', component: DocumentsComponent },
  { path: 'create-edit/:id', component: CreateEditComponent },
  { path: 'create-edit', component: CreateEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
