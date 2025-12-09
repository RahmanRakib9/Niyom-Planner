# Niyom Planner

Niyom Planner helps users create personalized workout plans, track their progress, and achieve their fitness goals through an intuitive and streamlined user experience.

---

## 📋 Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Screens & User Journey](#screens--user-journey)
- [API Integration](#api-integration)
- [Getting Started with Expo Go](#getting-started-with-expo-go)
- [Project Architecture](#project-architecture)
- [Installation](#installation)
- [Technologies Used](#technologies-used)

---

##  Project Description

Niyom Planner is a minimal yet powerful mobile application designed to simplify fitness planning and progress tracking. The app provides users with a streamlined experience to browse exercises, create personalized workout plans, and monitor their daily fitness activities.

The application provides a streamlined workflow that makes it easy for users to:
- **Browse** through a comprehensive exercise database
- **Select** exercises that match their fitness goals
- **Review** and customize their workout plan
- **Track** their daily progress and achievements

Built with React Native and Expo, Niyom Planner offers a responsive, cross-platform solution that works seamlessly on both iOS and Android devices.

---

## Features

### Dashboard with Real-time Statistics
The dashboard provides users with an immediate overview of their fitness journey. It displays key metrics including the total number of exercises in their plan, scheduled workouts, and today's progress. The interface adapts to different screen sizes using Flexbox layouts, ensuring a consistent experience across all devices.

### Intuitive Workout Planning Flow
The application provides a clear and logical workflow for creating and managing workout plans:
- **Browse Phase**: Users explore exercises with search and filter capabilities to discover workouts that match their needs
- **Selection Phase**: Exercises are added to a personal workout plan, allowing users to curate their ideal routine
- **Review Phase**: Users review their complete plan, set schedules, and confirm their selections before starting
- **Tracking Phase**: Daily progress is monitored and visualized, helping users stay motivated and track their achievements

### Global State Management with Context API
The app uses React Context API for efficient state management, eliminating prop drilling and reducing unnecessary component re-renders. The centralized state manages:
- User profile and preferences
- Exercise database cache
- Current workout plan
- Daily progress tracking data
- Loading and error states

### Third-Party REST API Integration
Niyom Planner integrates with the ExerciseDB API to provide users with a comprehensive database of exercises. The integration includes:
- Dynamic exercise fetching by muscle group, type, and difficulty level
- Intelligent caching to reduce API calls and improve performance
- Graceful fallback to sample data when API is unavailable
- Support for 16 muscle groups, 7 exercise types, and 3 difficulty levels

### Progress Tracking and Visualization
Users can track their daily workout completion with an intuitive interface that includes:
- Weekly progress overview with visual indicators
- Daily exercise completion tracking
- Progress charts showing completion percentages
- Historical progress data for motivation

---

## Screens & User Journey

### 1. Dashboard Screen
**Purpose**: Central hub providing quick access to all app features and current status.

**User Journey**:
- Users land on the Dashboard after opening the app
- View personalized greeting and fitness goal
- See at-a-glance statistics: total exercises in plan, scheduled workouts, today's progress
- Access quick action buttons to navigate to different sections
- View today's plan summary with completion status

**Key Features**:
- Responsive stat cards showing key metrics
- Progress visualization for today's scheduled exercises
- Quick navigation to all major features
- Profile access for settings and preferences

---

### 2. Browse Exercises Screen
**Purpose**: Discover and explore exercises from the comprehensive exercise database.

**User Journey**:
- Users navigate from Dashboard to browse available exercises
- Search for specific exercises by name
- Filter exercises by muscle group (chest, biceps, quadriceps, etc.)
- Filter by exercise type (strength, cardio, stretching, etc.)
- Filter by difficulty level (beginner, intermediate, expert)
- View exercise cards with key information
- Tap on exercises to view detailed information
- Add exercises directly to their plan from the browse screen

**Key Features**:
- Real-time search functionality
- Multiple filter options with visual indicators
- Exercise cards displaying muscle group, type, difficulty, and equipment
- Direct "Add to Plan" action from browse view
- Loading states and error handling
- Empty state messaging when no exercises match filters

---

### 3. Exercise Details Screen
**Purpose**: View comprehensive information about a specific exercise.

**User Journey**:
- Users tap on an exercise card to view full details
- Read complete exercise instructions
- View exercise specifications (muscle group, type, difficulty, equipment)
- Add exercise to their plan with a single tap
- Navigate to their plan to see all selected exercises
- Return to browsing to find more exercises

**Key Features**:
- Detailed exercise instructions
- Complete exercise metadata display
- Smart "Add to Plan" button (disabled if already in plan)
- Visual feedback when exercise is added
- Navigation to plan view after adding

---

### 4. My Plan Screen
**Purpose**: Manage and review all exercises selected for the workout plan.

**User Journey**:
- Users view all exercises they've added to their plan
- See which exercises are scheduled and which are pending
- Remove exercises they no longer want
- Tap on exercises to view details or make changes
- Navigate to review screen to finalize the plan
- See empty state with call-to-action if plan is empty

**Key Features**:
- List view of all plan items
- Visual indicators for scheduled vs. pending exercises
- Remove functionality with confirmation dialogs
- Quick navigation to review and schedule
- Exercise count display
- Empty state with helpful guidance

---

### 5. Review Plan Screen
**Purpose**: Finalize workout plan by setting schedule and confirming selections.

**User Journey**:
- Users review their complete plan summary
- Select schedule type (daily or weekly workouts)
- Set target duration for workout sessions
- Review all selected exercises one final time
- Confirm the plan to schedule all exercises
- Receive confirmation and navigate to progress tracking

**Key Features**:
- Plan summary with total exercise count
- Schedule selection (daily/weekly)
- Target duration input with validation
- Complete exercise list review
- Form validation before confirmation
- Success feedback and navigation options

---

### 6. Progress Tracking Screen
**Purpose**: Monitor daily workout completion and view progress over time.

**User Journey**:
- Users view their scheduled exercises for the selected date
- See weekly progress overview with completion percentages
- Select different dates to view historical progress
- Mark exercises as completed by tapping checkboxes
- View visual progress indicators for each day
- See completion statistics (completed/total exercises)
- Track progress across multiple days

**Key Features**:
- Weekly calendar view with progress bars
- Daily exercise list with completion checkboxes
- Visual progress indicators (percentage bars)
- Date selection for viewing different days
- Completion statistics display
- Progress persistence across app sessions

---

### 7. Profile Screen
**Purpose**: Manage user information, fitness goals, and preferences.

**User Journey**:
- Users access profile from Dashboard
- Enter or update personal information (name, age, weight, height)
- Select fitness goal (weight loss, muscle gain, maintenance)
- Validate all inputs with real-time error messages
- Save profile to personalize the app experience
- Return to Dashboard with updated information

**Key Features**:
- Comprehensive form with all user data fields
- Real-time input validation
- Clear error messages for each field
- Fitness goal selection with visual indicators
- Save functionality with success feedback
- Form state management and persistence

---

##  API Integration

### ExerciseDB API Overview

Niyom Planner integrates with the **ExerciseDB API** provided by API Ninjas, a free REST API service that provides comprehensive exercise data.

**Base URL**: `https://api.api-ninjas.com/v1/exercises`

### API Capabilities

#### 1. Fetch All Exercises
```javascript
fetchExercises()
```
- Retrieves the complete list of available exercises
- Returns exercise data including name, type, muscle group, equipment, difficulty, and instructions
- Used for initial exercise database population

#### 2. Filter by Muscle Group
```javascript
fetchExercisesByMuscle('chest')
```
- Filters exercises targeting specific muscle groups
- Supports 16 muscle groups: abdominals, biceps, chest, quadriceps, hamstrings, lats, triceps, and more
- Helps users focus on specific body areas

#### 3. Filter by Exercise Type
```javascript
fetchExercisesByType('strength')
```
- Filters exercises by type: strength, cardio, stretching, plyometrics, powerlifting, olympic_weightlifting, strongman
- Allows users to find exercises matching their workout style

#### 4. Filter by Difficulty
```javascript
fetchExercisesByDifficulty('beginner')
```
- Filters exercises by difficulty level: beginner, intermediate, expert
- Helps users find appropriate exercises for their fitness level

#### 5. Combined Filtering
```javascript
fetchExercises({ muscle: 'chest', type: 'strength', difficulty: 'intermediate' })
```
- Supports multiple filter parameters simultaneously
- Enables precise exercise discovery

### API Response Structure

Each exercise object contains:
```javascript
{
  name: "Exercise Name",
  type: "strength",
  muscle: "chest",
  equipment: "barbell",
  difficulty: "intermediate",
  instructions: "Detailed exercise instructions..."
}
```

### Error Handling & Fallback

The API integration includes robust error handling:
- **Network Failures**: Automatically falls back to curated sample exercises
- **Empty Responses**: Uses fallback data to ensure app functionality
- **Rate Limiting**: Gracefully handles API rate limits (10 requests/minute on free tier)
- **Invalid Responses**: Validates data before caching

### Caching Strategy

- Exercise data is cached in the app's global state after first fetch
- Reduces API calls and improves performance
- Cache persists during app session
- Users can refresh data by restarting the app

### Sample Data Fallback

When the API is unavailable, the app provides 8 curated sample exercises:
- Push-ups, Squats, Plank, Lunges, Pull-ups, Burpees, Deadlifts, Bench Press
- Ensures app functionality even without internet connection
- Covers various muscle groups and difficulty levels

---

## Getting Started with Expo Go

### Prerequisites

- Node.js (v14 or higher) installed on your computer
- Expo Go app installed on your Android or iOS device
- Both devices connected to the internet

### Step-by-Step Guide

#### 1. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
npm install
```

#### 2. Start the Development Server

Start the Expo development server using tunnel mode (recommended for best compatibility):

```bash
npm run start:tunnel
```

**Alternative**: Start with standard mode:
```bash
npm start
```

#### 3. Understanding Connection Modes

**Tunnel Mode** (Recommended):
- Routes connection through Expo's servers
- Works even if your phone and computer are on different networks
- More reliable for testing across different network configurations
- Slightly slower due to routing through servers

**LAN Mode**:
- Direct connection between devices
- Requires both devices on the same Wi-Fi network
- Faster connection speed
- May not work on some corporate or public networks

**Localhost Mode**:
- Only works on the same device
- Used for web browser testing

#### 4. Scan the QR Code

Once the server starts, you'll see a QR code in your terminal:

```
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █ ██▀▀ ▀▄██ ▄▄▄▄▄ █
█ █   █ █  ▀█ ▀█▄▄█ █   █ █
...
```

**For Android**:
1. Open the Expo Go app
2. Tap "Scan QR Code"
3. Point your camera at the QR code in the terminal
4. Wait for the app to load

**For iOS**:
1. Open the Camera app (not Expo Go)
2. Point at the QR code
3. Tap the notification that appears
4. Expo Go will open and load the app

#### 5. Troubleshooting

**If QR code doesn't work:**
- Ensure both devices are on the same network (for LAN mode)
- Try tunnel mode: Press `s` in terminal, then select `tunnel`
- Check firewall settings on your computer
- Verify Expo Go app is up to date

**If app fails to load:**
- Check terminal for error messages
- Press `r` in terminal to reload, or shake device and tap "Reload"
- Clear Expo Go cache: Settings → Clear cache
- Restart the development server

**If connection is slow:**
- Switch to LAN mode if on same network (press `s`, select `lan`)
- Check your internet connection
- Close other apps using network bandwidth

#### 6. Development Commands

While the server is running, you can use these commands:

- `r` - Reload the app
- `j` - Open debugger
- `m` - Toggle menu
- `s` - Switch connection mode (tunnel/LAN/localhost)
- `w` - Open in web browser
- `Ctrl+C` - Stop the server

---

## Project Architecture

### Directory Structure

```
MAD_FALL_25/
├── App.js                          # Application entry point with error boundary
├── app.json                        # Expo configuration (SDK 54)
├── package.json                    # Project dependencies and scripts
├── babel.config.js                 # Babel configuration for Expo
├── .gitignore                      # Git ignore rules
│
├── navigation/
│   └── AppNavigator.js            # React Navigation stack configuration
│
└── src/
    ├── context/
    │   └── AppContext.js          # Global state management with Context API
    │
    ├── screens/
    │   ├── Dashboard.js           # Main dashboard screen
    │   ├── BrowseExercises.js     # Exercise browsing and search
    │   ├── ExerciseDetails.js     # Individual exercise details
    │   ├── MyPlan.js              # Plan management screen
    │   ├── ReviewPlan.js           # Plan confirmation screen
    │   ├── ProgressTracking.js     # Progress monitoring screen
    │   └── Profile.js             # User profile management
    │
    ├── components/
    │   ├── ExerciseCard.js        # Reusable exercise display card
    │   ├── PlanItem.js            # Plan item display component
    │   ├── ProgressChart.js       # Progress visualization component
    │   └── InputField.js          # Form input with validation
    │
    ├── services/
    │   └── api.js                 # ExerciseDB API integration service
    │
    └── utils/
        └── validation.js          # Input validation utilities
```

### Architecture Patterns

#### 1. State Management Architecture

**Context API Pattern**:
- Centralized state in `AppContext.js`
- Provider wraps entire application in `App.js`
- Custom hook `useApp()` for accessing state
- Prevents prop drilling and reduces re-renders

**State Structure**:
```javascript
{
  userProfile: { name, age, weight, height, goal },
  exercises: [],           // Cached from API
  plan: [],                // Selected exercises
  progress: [],            // Daily tracking data
  loading: boolean,
  error: string | null
}
```

#### 2. Navigation Architecture

**Stack Navigator Pattern**:
- React Navigation Stack Navigator
- Centralized navigation configuration
- Consistent header styling across screens
- Deep linking support ready

**Navigation Flow**:
```
Dashboard
  ├── Browse Exercises
  │     └── Exercise Details
  │           └── My Plan
  ├── My Plan
  │     └── Review Plan
  │           └── Progress Tracking
  ├── Progress Tracking
  └── Profile
```

#### 3. Component Architecture

**Reusable Components**:
- **ExerciseCard**: Displays exercise information with optional actions
- **PlanItem**: Shows plan items with remove functionality
- **ProgressChart**: Visualizes progress with percentage bars
- **InputField**: Form input with built-in validation and error display

**Component Hierarchy**:
```
App
  └── AppProvider (Context)
      └── AppNavigator
          └── Screen Components
              └── Reusable Components
```

#### 4. Service Layer Architecture

**API Service Pattern**:
- Centralized API calls in `services/api.js`
- Separation of concerns (UI vs. data fetching)
- Error handling and fallback logic
- Exportable utility functions for filtering

#### 5. Validation Architecture

**Utility-Based Validation**:
- Centralized validation functions in `utils/validation.js`
- Reusable validation logic across forms
- Consistent error messaging
- Type-safe validation results

### Data Flow

1. **User Action** → Screen Component
2. **Screen Component** → Context Hook (`useApp()`)
3. **Context** → State Update
4. **State Update** → Component Re-render
5. **API Call** → Service Layer → Context Update
6. **Context Update** → Component Re-render with New Data

### Error Handling

**Multi-Layer Error Handling**:
1. **Error Boundary**: Catches React component errors in `App.js`
2. **API Error Handling**: Try-catch blocks in service layer
3. **Validation Errors**: Form-level validation with user feedback
4. **Network Errors**: Graceful fallback to sample data

### Performance Optimizations

- **Context Memoization**: `useCallback` for state update functions
- **API Caching**: Exercise data cached after first fetch
- **Lazy Loading**: Components loaded on navigation
- **Optimized Re-renders**: Context split to prevent unnecessary updates

---

## Installation

### Prerequisites

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)
- **Expo CLI**: Will be installed automatically
- **Expo Go App**: Available on [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) and [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Setup Instructions

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd MAD_FALL_25
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   Or with tunnel mode:
   ```bash
   npm run start:tunnel
   ```

4. **Open on your device**:
   - Scan the QR code with Expo Go app
   - Or press `a` for Android emulator, `i` for iOS simulator

### Available Scripts

- `npm start` - Start Expo development server
- `npm run start:tunnel` - Start server with tunnel mode
- `npm run android` - Open on Android emulator
- `npm run ios` - Open on iOS simulator
- `npm run web` - Open in web browser

---

## Technologies Used

### Core Framework
- **React Native** (v0.81.5) - Cross-platform mobile development
- **Expo** (SDK 54) - Development platform and tooling
- **React** (v19.1.0) - UI library

### Navigation
- **React Navigation** (v6) - Navigation library
  - `@react-navigation/native` - Core navigation
  - `@react-navigation/stack` - Stack navigator

### State Management
- **React Context API** - Global state management
- **React Hooks** - State and lifecycle management

### UI Components
- **React Native Core Components** - Built-in components
- **Expo Status Bar** - Status bar management

### API Integration
- **Fetch API** - HTTP requests
- **ExerciseDB API** - Third-party exercise database

### Development Tools
- **Babel** - JavaScript compiler
- **Metro Bundler** - React Native bundler
- **Expo CLI** - Development tools

### Validation
- **Custom Validation Utilities** - Form validation logic

---

## License

This project is private and proprietary.

---

##  Contributing

This is a private project. For questions or issues, please contact the development team.

---

**Built with ❤️ By Rakib**
