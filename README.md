# TaskMatch

Setup:
**Backend**
1. Make sure you have Python 3.11 or higher installed on your machine
2. Open a terminal (in VS code preferably)
3. make sure you are in the backend folder (cd backend)
4. If you do not have virtualenv installed, type pip install virtualenv
5. Type **virtualenv venv** to created virtual environment
6. Activate virtual environment by typing **venv\Scripts\activate** for Windows, **venv\bin\activate** for Mac
7. Type **pip install -r requirements.txt** to install required dependencies to virtual environment
8. Type **python manage.py makemigrations api** to package model changes in api directory locally
9. Type **python manage.py migrate** to migrate changes
10. Type **python manage.py makemigration** to package model changes in backend directory locally
11. Type **python manage.py migrate** to migrate changes
12. Type **python manage.py runserver** to run local server
13. Call APIs from Postman (API documentation here: https://docs.google.com/document/d/1zbgNH57ql_V_3nf_F7vgHqkWppIK6tNKxR0UsZjB8Nw/edit?usp=sharing)


**Frontend**
1. Make sure you have Node.js installed on your machine
2. Open a terminal (in VS code preferably)
3. make sure you are in the frontend folder (cd frontend)
4. npm i
5. npm run dev
