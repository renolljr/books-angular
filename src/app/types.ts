export interface imageLink {
  thumbnail: string;
}
export interface sectionID {
  id: string;
  title: string;
}
export interface updateBook {
  update: (book: book, shelf: string) => void;
}
export interface searchBook {
  search: (query: string) => void;
}
export interface BookEvent {
  book: book;
  event: any;
}

export interface book {
  id: number;
  shelf: string;
  title: string;
  authors: string[];
  imageLinks: imageLink;
}

export interface BookProps {
  book: book;
  shelf: string;
}

export interface ListBooksProps {
  books: books;
  sections: sectionID[];
}

export interface SearchBooksProps extends searchBook {
  query: string;
  books: books;
}

export type books = book[];
export type appState = {
  books: books;
  query: string;
  searchResults: books;
  sectionIDs: sectionID[];
};
export type appProps = appState;
