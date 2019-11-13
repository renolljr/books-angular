import { books } from './types';

export class BookShelf {
  constructor(public id: string, public title: string, public books: books) {}
}
