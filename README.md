# GT-StudyLink

GT-StudyLink is a web application that helps students connect, organize, and manage study events and meetups. The platform allows users to create events, RSVP to events created by others, and view all upcoming events through both calendar and list views.


## Features
- **User Authentication**: Register and login functionality using Firebase Authentication
- **Event Creation**: Create study events with details like title, location, date, time, and RSVP limits
- **Event Management**: View, edit, and delete events you've created
- **RSVP System**: RSVP to events created by other users
- **Calendar View**: Interactive calendar showing all upcoming events
- **List View**: Alternative list view of all events
- **Tagging System**: Add tags to events for better categorization and searching


## Tech Stack
- **Frontend**: React.js with Vite as the build tool
- **UI Components**: Bootstrap and React-Bootstrap for styling
- **Calendar**: FullCalendar for the calendar interface
- **Database**: Firebase Firestore for data storage
- **Authentication**: Firebase Authentication



## Setup Instructions
### Prerequisites
- Node.js (v16 or later) and npm installed on your machine
- A Firebase account for database and authentication services


### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/GT-StudyLink.git
   cd GT-StudyLink
   ```
2. Install dependencies:
   ```
   cd my-app
   npm install
   ```
3. Firebase Setup:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password) in your Firebase project
   - Create a Firestore Database in your Firebase project
   - Update the Firebase configuration in `src/lib/firebaseConfig.js` with your own Firebase project details:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID"
     }
     ```
4. Database Setup:
   - Create a `tags` collection in Firestore and add some initial tag documents with the structure:
     ```
     {
       name: "Study Group"
     }
     ```
   - Create a `users` collection (this will be populated automatically when users register)
   - Create an `events` collection (this will be populated when users create events)
5. Running the Application:
   ```
   npm run dev
   ```
   The application will be available at `http://localhost:5173/` (or the port specified by Vite).


### Project Structure
```
my-app/
├── public/             # Public assets
├── src/                # Source code
│   ├── components/     # Reusable React components (Calendar, Table, ViewEvents)
│   ├── lib/            # Configuration files (firebaseConfig.js)
│   ├── pages/          # Main page components (Home, Events, Login, Register, AddEvents)
│   ├── styles/         # CSS styles for components and pages
│   ├── utils/          # Utility functions and context providers (AuthContext, MainLayout, ProtectedRoutes)
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point
├── node_modules/       # Dependencies (installed via npm)
├── package.json        # Dependencies and scripts
├── package-lock.json   # Lock file for dependencies
└── vite.config.js      # Vite configuration
```


## Usage
1. Registration/Login:
   - New users can register with email and password
   - Existing users can log in with their credentials
2. Home Page:
   - View a personalized greeting
   - See events you've created
3. Events Page:
   - Toggle between calendar and list views
   - See all events created by all users
   - RSVP to events (if logged in)
4. Add Events:
   - Create new events with details like title, location, date, time
   - Set RSVP limits
   - Add tags to categorize your event
5. Managing Your Events:
   - Edit or delete events you've created
   - View RSVPs for your events

## Data Model
The application uses the following data models:
- Users:
  ```
  {
    firstName: string,
    lastName: string,
    email: string,
    lastActive: timestamp,
    rsvps: array (optional)
  }
  ```

- Events:
  ```
  {
    title: string,
    location: string,
    date: string,
    startTime: string,
    endTime: string,
    rsvp: number,
    tags: array,
    details: string,
    authorEmail: string,
    authorID: string,
    rsvps: array (optional)
  }
  ```

- Tags:
  ```
  {
    name: string
  }
  ```


## Dependencies
The project relies on the following main dependencies:
- React and React DOM for UI
- Firebase for authentication and database
- FullCalendar for calendar functionality
- Bootstrap and React-Bootstrap for styling
- React Router for navigation
- React Multi Select Component for tag selection
- RandomColor for generating event colors


## Building for Production
To build the application for production:
```
npm run build
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.
