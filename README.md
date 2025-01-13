# More music!

Fullstack app built with NextJS/React, Apollo, GraphQL, PostgreSQL, and SCSS

## About

If there's something I felt Spotify lacks, it's the ability to share thoughts and opinions of music online. There is no type of review 
or commenting system on the app, unlike Soundcloud which at least has commenting. Sometimes it's nice to see what you think of albums
and have a way of explaining your love for a certain album that doesn't require verbal explanation. This app allows you to log albums
you've listened to, give it a score, and write a review/anecdote as to why you like it--or hate it--so much.

## How to run


To run start the web application, cd into the app directory, then run the following:
>`npm install` <br/>
>`npm run dev` <br/>

To run the Apollo webserver, Ensure you have cd into the `backend` directory, and run the following commands:

>`npm install -g nodemon` <br/>
>`npm run dev` <br/>

This will run the Apollo server using nodemon. 

Finally, ensure the database is synced using the Prisma ORM. Run this to install Prisma:

>`npm install @prisma/client`

And then run the following to sync the database:

>`npx prisma generate` <br/>
>`npx prisma db push` <br/>
