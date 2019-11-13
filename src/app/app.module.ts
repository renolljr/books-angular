import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { ListbooksComponent } from './listbooks/listbooks.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { BookService } from './book.service';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    ListbooksComponent,
    SearchBooksComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [ApiService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule {}
