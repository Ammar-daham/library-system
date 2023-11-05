# Fullstack project - Imaginary Library

## Overview
This is a library application built using React. It allows users to view a list of books, authors and categories. It allows users to add, update and delete book, author and category.

## Installation

You should use either `npm` or `yarn` but not both. **It's recommended** to use `yarn`

We have two different folders:

1. `api:` where the backend lives

2. `client:` Frontend of the application

To run the application locally, follow these steps:

* Make sure you have Node.js and npm installed on your system.
* Clone the repository to your local machine.
* Open a terminal and navigate to the project directory.
* Run npm install to install the required dependencies.
* After the installation is complete, run npm start to start the development server.
Open your web browser and go to http://localhost:3000 to view the application.

To install, you need to go to both directories and install their packages as such:

```bash
cd api
yarn install
```

```bash
cd client
yarn install
```

To run the `frontend` make sure you are under the client folder and:

````bash
yarn start
````

To run the `backend` make sure you are under the api folder and:

````bash
yarn start:dev
````
<br />


## `api` folder

1. Create a `.env` file in the root directory and copy the content from `.env.example`
2. Make sure MongoDB is running (if you are using local MongoDB)
3. If you need to customize your env, take a look at `secrets.ts` file
4. Separate routes and functions into routers, controllers, services folders

<br />

## `client` folder

1. Create a `.env` file in the root directory if you need to store secret data
2. You can complete your project using SASS, CSS, or other styling libraries

<br />

## Features
* View a list of books, authors and categories
* Add new book, author and category to the database.
* Edit existing book, author and category to update their details.
* Delete book, author and category from the database.
* User authentication with google and sign-up forms.

## Technologies Used

Front End: 
* TypeScript
* React
* React Router
* Redux Toolkit
* Axios (for API requests)
* Material-UI for UI components
* CSS

<br>

Back End and Database:
* TypeScript
* Express js 
* Mongoose
* Google authentication
* Jest
* MongoDB

## Additional Notes
* The application uses local storage to clear data when the window is closed (window.onbeforeunload).
* User authentication and authorization are handled on the server-side.

## Future Development

Here are some planned features and improvements for the future development of the application:

- **Complete Lend and Return Functionality**: Implement a feature that allows users to lend books to others and track their return.

- **Enhanced Search and Filters**: Enhance the search functionality with advanced filters, allowing users to find books based on various criteria such as genre, publication date, and more.

- **Improved UX Design**: Continuously work on enhancing the user experience by refining the application's interface, optimizing navigation, and ensuring a seamless interaction flow.

- **Reading Mode**: Introduce a reading mode that enables users to read books directly within the application, providing a convenient reading experience.

- **User Profiles and Recommendations**: Implement user profiles to track reading history and preferences. Use this data to provide personalized book recommendations.

- **Performance Optimization**: Continuously work on optimizing the application's performance, including faster load times.
 

## Timetable

About 40h built the back-end earlier

| Date  | Hours | subject | 
| ------------- | ------------- | ------------- |
| 2.10.2023  | 6h  | Login From/Functionality/style |
| 2.10.2023  | 6h  | Sign up Form/Functionality/style |
| 3.10.2023  | 8h  | NavBar/Header/Footer/style |
| 4.10.2023  | 7h  | Logout/Profile page/style |
| 6.10.2023  | 3h  | refactoring Login/sign up pages |
| 8.10.2023  | 9h  | Book card/Books |
| 10.10.2023  | 3h  | Book page |
| 11.10.2023  | 2h  | api: added language and pages |
| 12.10.2023  | 2h  | Button style |
| 13.10.2023  | 4h  | Header refactoring |
| 14.10.2023  | 2h  | Alert page |
| 15.10.2023  | 5h  | Book Form |
| 16.10.2023  | 1h  | Book Form Refactored |
| 17.10.2023  | 3h  | Update book |
| 22.10.2023  | 8h  | Refactoring new book and selected authors and categories|
| 23.10.2023  | 4h  | Refactoring code |
| 24.10.2023  | 1h  | added categories and authors type to BookProps |
| 25.10.2023  | 3h  | Delete Book and refactoring |
| 26.10.2023  | 1h  | Deploying first version to fly |
| 27.10.2023  | 1h  | updated author slice |
| 27.10.2023  | 3h  | added author form |
| 30.10.2023  | 2h  | fetch authors and delete author |
| 31.10.2023  | 2h  | update author and refactoring |
| 2.11.2023   | 2h  | fetching and adding new genre |
| 3.11.2023   | 1h  | updating and deleting category |
| 3.11.2023   | 2h  | Refactoring, cleaning up and new build |
| 5.11.2023   | 1h  | Documentation |


| 23.10.2023  | 132h  | Refactoring code |

