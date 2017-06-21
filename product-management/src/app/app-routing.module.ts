import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path: '', children: [], component: HomeComponent},
  {path: 'productslist', children: [], component: ProductsComponent},
  {path: 'create', children: [], component: CreateComponent},
  {path: 'products/:id', children: [], component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
