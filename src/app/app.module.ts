import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { ListbooksComponent } from './listbooks/listbooks.component';
import { SearchBooksComponent } from './search-books/search-books.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    ListbooksComponent,
    SearchBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
