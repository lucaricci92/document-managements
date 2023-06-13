import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { ServiceService } from './service.service';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    DocumentsComponent,
    CreateEditComponent,
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DocumentsModule { }
