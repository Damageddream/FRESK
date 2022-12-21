# FRESK

## Overwiew

The "fresk" project was created due to the demand of the nonprofit organization, to create a site that would allow it to keep events updated. At the same time, the site is a credit project for CS50's Web Programming with Python and JavaScript course. 

## Distinctiveness and Complexity - for CS50's Web Programming with Python and JavaScript course

### Distinctiveness

The project in no way refers to previous projects from the course, its purpose is to present the non-profit organization, show its structures, history, services offered and projects currently underway. The tool that sets the project apart is the ability to dynamically add events. An event created through a form, allows you to add a description, a photo, and with the help of the drafj.js library, enrich the text in a way known from text editing programs, also each member of the organization, will be able to fully create their own event. 

In each event, you can dynamically add photos, from which a gallery is created and also downloadable files. 

### Complexity

The project largely extends the scope of the course, based of course on django in the backend and javascript in the frontend. I've added the Django Rest Framework to the core django library, which allows you to create web APIs. The javascript part of the frontend is done in the REACT framework, and a single-page application is created with its help. In addition, additional libraries were used for both the frontend and backend, listed in full in the requirements.txt file.

Because of the combination of REACT and Django REST, authorization and authentication is done with json web tokens


## Files

### Backend

In the backend folder, we have the standard django framweork files. 5 models have been created. In addition, a seralizers file was created, meeting the standards for using Django REST framwework. 
In the backend folder there is also a media folder, where files added by users are saved. 

### Frontend

According to the REACT standard, in the frontend folder we have a subfolder public, where the file index.hmtl is located, in it are added dependencies.

In the SRC -> Images folder. There are static images used by REACT. 

In the SRC folder -> sass. Css files are located.

In the SRC -> components folder. We have all the compnents that make up the whole page. 

## How to run

To run the application, download the code from github. Then in the backend folder install the frameworks: Django and Django REST. 

In the frontend folder, the REACT framework and the react-router-dom library.

The minor libraries used in the project and needed for use are listed in the requirements.txt file 

After the necessary installations, being in the backend folder, type "python manage.py runserver" in consola and "npm start" in the frontend folder.

## How to use

The login is in an inconspicuous place, as it is for use only by the organization's employees, and did not disturb other users of the site.
Registration is only available after login, as it should not be done by users only by employees who already had accounts for security purposes. 

### ***IMPORTANT***

To use the entire capabilities of the site the first time log in using the data:

Login: Nowy

Password: nowy123

Link to login is in footer, Column "Dane" -> "Pracownicy"

After logging in, new options will appear in the navbar, and additional buttons in the paths /aktualnosci, /aktualnosci:id

After loggin in, you can register new users in navbar->profile-> 'zarejestruj użytkownika'

## Options

With the application you can add new events, using the Draf.js library to diversify the text as you like. Each event can be edited and deleted.

You can add images to the event, from which a gallery is dynamically created thanks to React Image Gallery. You can also add and delete downloads. 

You can use the contact form to send messages, which are saved in user profiles.  


