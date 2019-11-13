import { Component, OnInit, Injectable } from '@angular/core';
import { inherits } from 'util';
import { BookService } from './book.service';
import { books } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'books-angular';
  books: books;

  constructor() {}
}
