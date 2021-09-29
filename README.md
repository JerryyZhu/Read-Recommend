# ReadRecommend - Book Community Website

A web applicaton similar to GoodReads offering with more modern UI. This was a group project that was completed in the final semester.

## Features
* Authentication and sessions
* View book details
* User Book Collections
* Ratings and comments system
* Profile pages
* Search
* Book recommendations based on machine learning using collaborative filtering with tags and user ratings
* Reader goals

## Technology Stack
- React with Ant Design for UI Framework
- Django Python for Backend
- Machine Learning - Collaboration Filtering with Python and FastAI

## Screenshots
![](https://github.com/JerryyZhu/Read-Recommend/blob/main/screenshots/Book.png)
![](https://github.com/JerryyZhu/Read-Recommend/blob/main/screenshots/Profile.png)
![](https://github.com/JerryyZhu/Read-Recommend/blob/main/screenshots/Book%20Challenges.png)
  
## Running back-end locally

* Install python3 and pip3
* Perform all the following actions in the 'server' folder
* Create a virtual environment:

> python3 -m venv env

* Activate the virtual environment:

> source env/bin/activate (for Linux or macOS)

> env\Scripts\activate (for Windows)

* Install the python dependencies

> pip3 install -r requirements.txt

* Run the server with port 9000

> python3 manage.py runserver 9000

## Running front-end locally

* Install npm
* Perform all the following actions in the 'client' folder
* Install all dependent packages:

> npm install

* Start server

> npm run start

## Accessing the website
* Navigate to <[http://localhost:3000/login](http://localhost:3000/login)>
* Login or create an account 
* Alternatively you can access the website through http://45.32.240.36:3900/

## File Structure
```
capstone-project-grill/
└── client/                                             // Front End Code
		├── src/
        |       ├── layout/
        |       │		├── AuthenticatedLayout.js      // Wrapper layout component for pages that require authentication
        |       │		└── PublicLayout.js             // Wrapper layout component for pages that do not require authentication
		│		└── pages/                              // Folder containing XXXPage.js and other components it imports
		├── App.js                                      // Main application that wires the routes from routes.js to the pages in the pages folder
		├── axios-calls.js                              // Functions for backend calls.
		├── index.css                                   // Default css.
		├── index.js                                    // Entry webpoint for web app
		└── routes.js                                   // Contains a list of page routes.
└── server/                                             // Back End Code
		├── api/                                        //  Primary API folder
		│		├── views/                              //  All of the endpoint functions
		│		└── migrations/                         //  Databse changes stored in .py files
		│── api_tests/                                  //  Tests for the api endpoints, (bash)
		│── server/                                     //  Stub folder for intial django project
		└── db.sqlite3/                                 //  Database to store user, book data
└── ml/                                                 // Collaborative Filtering Jupyter Notebook + Results
		│── books.csv/                          	//  books.csv 10k Good Reads Book source: https://www.kaggle.com/zygmunt/goodbooks-10k
		│── collabfiltering.ipynb/                      //  Machine Learning Algorithm and Data Preparation + Output
		│── recommendations.json/			//  Generated book recommendation map for Django, {"1": [List of BookIds]}
		└── ratings.csv/ 				//  Ratings from users source: https://www.kaggle.com/zygmunt/goodbooks-10k
		
```
