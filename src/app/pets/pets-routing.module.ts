import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsListaComponent } from './pets-lista/pets-lista.component';
import { PetsFormComponent } from './pets-form/pets-form.component';
import { PetResolverGuard } from './guards/pet-resolver.guard';

const routes: Routes = [
  { path: '', component: PetsListaComponent },
  {
    path: 'novo',
    component: PetsFormComponent,
    resolve: {
      pet: PetResolverGuard,
    },
  },
  {
    path: 'editar/:id',
    component: PetsFormComponent,
    resolve: {
      pet: PetResolverGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
