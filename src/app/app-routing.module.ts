import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListbooksComponent } from './listbooks/listbooks.component';
import { SearchBooksComponent } from './search-books/search-books.component';

const routes: Routes = [
  { path: '', component: ListbooksComponent, pathMatch: 'full' },
  { path: 'search', component: SearchBooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
