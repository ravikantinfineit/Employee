Getting Started with Create React App
This project was bootstrapped with Create React App.

📋 Functionality
This React application includes the following features:

Responsive admin dashboard UI

Employee management (add, edit, delete, view)

Invoice creation and list view

Dynamic forms and lists

Local db.json data simulation using json-server

LocalStorage or REST API support for backend data persistence (depending on setup)

💻 Available Scripts
In the project directory, you can run:

⚙️ Setup Instructions
Before running the project, install all dependencies using:
command : npm install

🔌 JSON Server Setup
We use json-server to simulate a backend REST API using a local JSON file.

Start JSON Server
command : npx json-server --watch src/data/db.json --port 4000

▶️ npm start
command : npm run start
Runs the React app in development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload automatically if you make edits.
You will also see any lint errors in the console.

🧪 npm test
command : npm test
Launches the test runner in the interactive watch mode.
See more about running tests.

🏗️ npm run build
command : npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for best performance.

The build is minified, and the filenames include the hashes.
Your app is ready to be deployed!

See deployment docs for more information.

⚙️ npm run eject
Note: this is a one-way operation. Once you eject, you can’t go back!

This will copy all configuration files and dependencies (webpack, Babel, ESLint, etc.) into your project, giving full control over them.

💻 Available Scripts
In the project directory, you can run:

npx json-server --watch src/data/db.json --port 4000

npm start – Runs the app in development mode

npm test – Launches the test runner

npm run build – Builds the app for production

npm run eject – Ejects the configuration (irreversible)
