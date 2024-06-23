# TaskManager









Directory Structure
TaskManager/
│
├── index.html           # Landing page for the Task Manager application
├── style.css            # Cascading Style Sheets (CSS) for styling the application
├── script.js            # JavaScript file for frontend interactions
│
└── task_manager_api/    # Backend API for Task Manager
    │ instances
     -----|task.db
    ├── __init__.py      # Initialization file for Flask application
    ├── app.py           # Main Flask application file
    ├── models.py        # SQLAlchemy models for database
    ├── routes.py        # API routes definition
    ├── requirements.txt # List of Python dependencies
    |_ templates/
       |-index.html
    └── static/
        ├── style.css    # Static CSS files for Flask application
        └── script.js    # Static JavaScript files for Flask application

