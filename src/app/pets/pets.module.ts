import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsListaComponent } from './pets-lista/pets-lista.component';
import { PetsFormComponent } from './pets-form/pets-form.component';


@NgModule({
  declarations: [
    PetsListaComponent,
    PetsFormComponent
  ],
  imports: [
    CommonModule,
    PetsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PetsModule { }
