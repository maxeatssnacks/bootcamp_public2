# Jobly Backend

This is the Express backend for Jobly, version 2.

Install

    - Node.js
    - npm
    - PostgreSQL

Clone the Repository

Navigate to local repo

    cd express-jobly

Install Dependencies using:

    npm install

Create db and test_db

    psql -f setup_databases.sql

Create .env file in root and add the following lines,
    ensuring that you update your secret key

    SECRET_KEY=your_secret_key_here
    PORT=3001
    DATABASE_URL=postgresql:///jobly

To run this:

    nodemon
    
To run the tests:

    npm test
