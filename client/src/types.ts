import { Dispatch, SetStateAction } from "react"

// Action types
export type Book = {
  id: string
  isbn: string
  title: string  
  description: string
  publisher: string
  // borrowerId: string[]
  authors: string[]
  publishedDate: string
  cover: string
  borrowDate: string
  returnDate: string
  status: string
  categories: string[]
  language: string
  pages: number
}

export const initialBook: Book = {
  id: '',
  isbn: '',
  title: '',  
  description: '',
  publisher: '',
  // borrowerId: [],
  authors: [],
  publishedDate: '',
  cover: '',
  borrowDate: '',
  returnDate: '',
  status: '',
  categories: [],
  language: '',
  pages: 0
}

export type Author = {
  id: string
  name: string
  email: string
  books: string[]
}

export const initialAuthor: Author = {
  id: '',
  name: '',
  email: '',
  books: []
}

export type Category = {
  id: string,
  name: string,
  books: []
}

export const initialCategory: Category = {
  id: '',
  name: '',
  books: []
}

export interface AuthorsProps {
  authors: Author[];
  successMessage: string | null
  errorMessage: string | null
  setSuccessMessage: React.Dispatch<string | null>
  setErrorMessage: React.Dispatch<string | null>
}

export interface BooksProps {
  books: Book[]; 
  categories : Category[];
  authors: Author[];
  successMessage: string | null
  errorMessage: string | null
  setSuccessMessage: React.Dispatch<string | null>
  setErrorMessage: React.Dispatch<string | null>
  handleDeleteClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => Promise<void> | null
}

export interface NewBookProps {
  categories : Category[];
  authors: Author[];
  successMessage: string | null
  errorMessage: string | null
  setSuccessMessage: React.Dispatch<string | null>
  setErrorMessage: React.Dispatch<string | null>
}

export interface NewAuthorProps {
  books: Book[];
  successMessage: string | null
  errorMessage: string | null
  setSuccessMessage: React.Dispatch<string | null>
  setErrorMessage: React.Dispatch<string | null>
}

export interface SelectedAuthorsCategoriesProps {
  book: Book | null
  name: string,
  label: string,
  setBook: React.Dispatch<React.SetStateAction<Book>> | null
  categories: Category[] | null
  authors: Author[] | null
}

export interface SelectedBooksProps {
  author: Author | null
  category: Category | null
  name: string,
  label: string,
  setAuthor: React.Dispatch<React.SetStateAction<Author>> | null
  setCategory: React.Dispatch<React.SetStateAction<Category>> | null
  books: Book[] | null
}

export interface BookFormProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  book: Book;
  name: string
  title: string
  successMessage: string | null
  errorMessage: string | null
  setBook: React.Dispatch<React.SetStateAction<Book>>
  categories: Category[] | null
  authors: Author[] | null
}

export interface AuthorFormProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
  author: Author
  name: string
  title: string
  books: Book[] | null
  setAuthor: React.Dispatch<React.SetStateAction<Author>>
  successMessage: string | null
  errorMessage: string | null
}

export type User = {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  isAdmin: boolean
  password: string
}

export type loggedGoogle = {
  email: string
  password: string
}

export type loggedUser = {
  username: string
  password: string
}

export type loggedInUser = {
  email: string,
  username: string,
  token: string
}

export const initialUser: User = {
  id: '',
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  isAdmin: false,
  password: '',
}

export const initialLoggedGoogle: loggedGoogle = {
  email: '',
  password: '',
}

export const initialLoggedUser: loggedUser = {
  username: '',
  password: '',
}

export const initialLoggedInUser: loggedInUser = {
  email: '',
  username: '',
  token: ''
}

export type DecodedUser = {
    userId: string,
    isAdmin: boolean,
    iat: number,
    exp: number
}

export interface HeaderProps {
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
}

export interface CustomError {
  code: number;
  message: string;
}


