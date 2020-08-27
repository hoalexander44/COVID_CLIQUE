Follow these instructions to Setup the full web development stack locally
STEP 1
Download and Install Node JS here
https://nodejs.org/en/

STEP 2
Download and Install Postgres
https://www.postgresql.org/download/
Remember the password you created

STEP 3 setting up environment
open the env.json file
change 	"password": "" 
to
"password": "postgres password you created",

STEP 4 setup client
cd into COVID_CLIQUE/client
open terminal and run npm install

STEP 5 setup backend
cd into COVID_CLIQUE/backend
open terminal and run npm install
 

STEP 6 setup database
Edit the environment variables to include C:\Program Files\PostgresSQL\{YOUR VERSION NUMBER}\bin or wherever you installed postgres

Login to postgres with
psql --username postgres
	enter the password you created
run these commands and queries in your console
CREATE DATABASE covid_clique;

\c covid_clique

CREATE TABLE users (username VARCHAR(20), hashed_password CHAR(60));

CREATE TABLE user_data (id SERIAL PRIMARY KEY, username VARCHAR(50), score INT, last_location_time VARCHAR(50), isinfected BOOL, hassymptoms BOOL);

CREATE TABLE locations (id SERIAL PRIMARY KEY, location_name VARCHAR(50), visits INT, infected_visits INT, location_score INT);

CREATE TABLE users_and_location (id SERIAL PRIMARY KEY, location_name VARCHAR(50), username VARCHAR(50), date VARCHAR(50));
 

STEP 7 mocking locations
Feel free to create some pseudo data but I recommend starting off with this to show off the features
INSERT INTO locations (location_name, visits, infected_visits, location_score) VALUES (‘mall’, 200, 8, 1000);

INSERT INTO locations (location_name, visits, infected_visits, location_score) VALUES (‘bar’, 500, 20, 2500);

INSERT INTO locations (location_name, visits, infected_visits, location_score) VALUES (‘mall’, 50, 50, 0);

STEP 8 Running client
Cd into COVID_CLIQUE/client/ 
Enter command: npm start

STEP 9 Running backend
CD into COVID_CLIQUE/backend/
Enter command: node server.js

STEP 10 Accessing the react app from the browser
Enter localhost:3000 into your browser

STEP 11 Play around with the app




