import { Injectable } from '@angular/core';
import { BookShelf } from './bookshelf.model';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
import { book, books } from './types';

@Injectable()
export class BookService {
  private books: books;
  private isUpdated: boolean = false;
  constructor(private apiService: ApiService) {}

  /* 
  state = {
    books: [],
    query: '',
    searchResults: [],
    sectionIDs: [
      { id: 'currentlyReading', title: 'Currently Reading' },
      { id: 'wantToRead', title: 'Want to Read' },
      { id: 'read', title: 'Read' }
    ],
    bookshelfs: [
      new BookShelf('currentlyReading', 'Currently Reading', []),
      new BookShelf('wantToRead', 'Want to Read', []),
      new BookShelf('read', 'Read', [])]
  };
 */

  bookStatusChanged = new Subject<boolean>();
  searchResults = new Subject<books>();

  searchBooks(query: string, count: number) {
    return this.apiService.search(query, count);
  }

  updateBooks(book: book, shelf: string) {
    return this.apiService.update(book, shelf);
  }

  loadBooks() {
    return this.apiService.getAll();
  }
}
