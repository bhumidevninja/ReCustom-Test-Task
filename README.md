# ReCustom Dashboard

This project consists of a frontend built with React + TypeScript and a backend built with Python (Django). Below are the instructions for running the frontend and backend, along with details on available APIs.

## Frontend Setup

To set up and run the frontend:

1. Navigate to the `frontend/recustom_dashboard/` directory:

```bash
   cd frontend/recustom_dashboard/
```


2.  Install the necessary dependencies:

```bash
    yarn install
```

3.  Start the development server:

```bash
    yarn start
```


### Unit Tests for Frontend

To run unit tests for the frontend, use:

```bash
    yarn test
```

## Backend Setup

To set up and run the backend:

1.  Navigate to the `backend` directory:

```bash
    cd backend
```

2.  Create a virtual environment (if you don't have one already):

```bash
    python -m venv venv
```

3.  Activate your virtual environment:

    -   On Windows:

```bash
        venv\Scripts\activate
``

    -   On MacOS/Linux:

```bash
        source venv/bin/activate
```

4.  Install the necessary Python dependencies:

```bash
    pip install -r requirements.txt
```

5.  Connect your database by configuring your database settings in the Django `settings.py` file.

6.  Populate the database with initial data:

```bash
    python manage.py seed_data
```

7.  Run the backend server:

```bash
    python manage.py runserver
```


The backend should now be running at `http://localhost:8000`.

## APIs

### Users API

-   **POST** `http://localhost:8000/api/users/` : Body: `{ "name": "User Name", "email": "user@example.com", "role": "user" }`

-   **GET** `http://localhost:8000/api/users/`
    Retrieves the list of all users.

-   **PUT** `http://localhost:8000/api/users/{id}/`
    Update the user with ID.

-   **DELETE** `http://localhost:8000/api/users/{id}/`
    Delete the user with ID.


### Activity Logs API

-   **GET** `http://localhost:8000/api/activity-logs/`
    Retrieves all activity logs.

-   **GET** `http://localhost:8000/api/activity-logs/{id}/`
    Retrieves activity log with ID.


### Download PDF

-   **GET** `http://localhost:8000/api/users/{id}/download_pdf/`
    Download the PDF for the user with ID.
