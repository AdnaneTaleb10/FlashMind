
# Flash Mind

A flashcard application for effective studying and learning. Create folders, organize flashcards, and track your study progress.

## Features

### Folder Management

- Create and organize folders for different subjects
- Edit and delete folders
- View all folders with card counts

### Flashcard System

- Create flashcards with questions and answers
- Edit and delete individual cards
- View cards within folders

### Study Mode

- Interactive study sessions with card flipping animations
- Mark answers as correct or wrong
- Navigate through flashcards sequentially

### Study History

- Track study sessions with scores
- View percentage, correct/wrong answers
- See time elapsed since last study session
- Filter and sort history

### User Profile

- Update username and name
- Change password securely
- View account information

### Modern UI

- Responsive design for all devices
- Clean and intuitive interface
- Smooth transitions
- Toast notifications for user feedback

## Tech Stack

### Frontend

- React - UI library
- React Router - Navigation
- Axios - HTTP requests
- Lucide React - Icons
- Sonner - Toast notifications
- CSS - Styling with responsive design

### Backend

- Java Spring Boot - REST API
- PostgreSQL - Database
- JDBC Template - Database operations
- Session-based Authentication

## Project Structure

```
flash-mind/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context (AppContext)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service calls
│   │   └── utils/          # Helper functions
│   └── public/
│
└── backend/
    ├── src/
    │   ├── controller/     # REST endpoints
    │   ├── service/        # Business logic
    │   ├── dao/            # Database access
    │   └── model/          # Data models
    └── resources/
```