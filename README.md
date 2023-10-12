# Photo Collection

## Overview

The Photo Collection App is a web application that allows users to create collections of photos. Users can make collections, upload photos in those collections, and all the collections will be publicly visible on the homepage. Only the owner of a collection can edit it.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Running the App](#running-the-app)
3. [Contributing](#contributing)
4. [License](#license)

## Getting Started

Before you begin, make sure you have Node.js and npm (Node Package Manager) installed on your system. If you haven't already, you can download and install them from [https://nodejs.org/](https://nodejs.org).

### Clone the Repository

Clone the Photo Collection App repository from GitHub:

```bash
git clone https://github.com/calugayrhea/pcollection.git

Install Dependencies
First, navigate to the backend directory and install the backend dependencies:

cd pcollection/backend
npm install

Next, navigate to the client directory and install the frontend dependencies:
cd ../client
npm install

Importing the Database
The database for the Photo Collection App is named collection. It is powered by MySQL and is located in the backend/database directory. 

Running the App
To run the Photo Collection App, you'll need to start both the backend and frontend servers.

Backend
In the pcollection/backend directory, start the Node.js server using nodemon:
cd pcollection/backend
nodemon server.js

Client
In the pcollection/client directory, start the development server:
npm run dev


Contributing
Contributions to this project are welcome. If you have suggestions, bug reports, or would like to contribute code, please follow the project's guidelines for contributing.

License
This project is licensed under the Your License Name. Please review the license before using or contributing to the project.

This README provides detailed instructions for getting started, running the Photo Collection App, and importing the database. It also explains how to contribute to the project and provides information about the project's licensing terms. The testing section is marked as optional, as per your request. It should help users and potential contributors use and work with your application effectively.

