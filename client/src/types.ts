import { Dispatch, SetStateAction } from "react"

// Action types
export type Book = {
  id: string
  isbn: string
  title: string  
  description: string
  publisher: string
  // borrowerId: string[]
  authors: Author[]
  publishedDate: string
  cover: {
    small: string
    large: string
  }
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
  cover: {
    small: '',
    large: ''
  },
  borrowDate: '',
  returnDate: '',
  status: '',
  categories: [],
  language: '',
  pages: 0
}

export interface BooksProps {
  books: Book[]; 
}

export interface BookFormProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  book: Book | null;
  name: string
  title: string
  successMessage: string | null
  errorMessage: string | null
  setBook: React.Dispatch<React.SetStateAction<Book>>
}


export type Author = {
  _id: string
  name: string
  email: string
  books: Book[]
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


