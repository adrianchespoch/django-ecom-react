# Project Setup Guide

## Backend Setup

1. **Create a virtual environment and activate it:**

```sh
python3 -m venv venv
source env/bin/activate
```

2. Install the required Python packages:
```sh
pip install -r requirements.txt
```

3. Set up the database:
This project uses SQLite for development. The database file is `db.sqlite3` located at the root of the project.
```sh
touch db.sqlite3
```

4. Run the migrations:
```sh
python manage.py makemigrations
python manage.py migrate
```

5. Start the Django server:
```sh
python manage.py runserver
```

