# Sports Tournament Calendar App

A React Native app built with Expo that displays sports tournaments in an interactive calendar and card view. Users can filter by sports, view tournament details, and explore match fixtures.

## Demo Video
[Demo Video Link](https://drive.google.com/file/d/1Bm7-nJ4fOUILzuL2Gk9mQjQSQKzsdkds/view?usp=drivesdk)

## Apk Link
[EAS build Apk link](https://expo.dev/artifacts/eas/wSUbYpXj4y12Jpb6dpZJKE.apk)

## Features

✅ **Sports Filter Dropdown**
- Fetches sports from StapuBox API
- Default: "All Sports" selected
- Dynamic filtering of calendar highlights and tournaments

✅ **Interactive Calendar**
- Month view navigation
- Highlights tournament start dates only
- Tap highlighted dates to filter tournaments

✅ **Tournament Cards**
- Outer cards display: logo, name, sport, level, date
- Inner cards show expandable match fixtures
- Automatic expand/collapse functionality
- No expand icon when no fixtures available

✅ **Time Zone Support**
- All dates/times displayed in IST (Indian Standard Time)
- Proper parsing of API date/time formats

✅ **Enhanced UX Features**
- Skeleton loaders during data fetch
- Pull-to-refresh functionality
- Offline caching with AsyncStorage
- Error handling and retry mechanisms
- Empty states and loading indicators

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd tournaments-calendar
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npx expo start
```

4. **Run on device/simulator**
- Scan QR code with Expo Go app (iOS/Android)


### Building APK

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Configure EAS**
```bash
eas login
eas build:configure
```

3. **Build APK**
```bash
eas build --platform android --profile preview
```

## API Integration

### Sports API
- **Endpoint**: `https://stapubox.com/sportslist`
- **Fallback**: Mock data for badminton and football

### Tournaments API  
- **Endpoint**: `https://stapubox.com/tournament/demo`
- **Fallback**: Mock tournament data with sample fixtures

## Technical Decisions

### Architecture
- **Modular Components**: Separated concerns with dedicated components
- **TypeScript**: Full type safety throughout the app
- **Custom Hooks**: Efficient data management and caching

### State Management
- React hooks for local state
- AsyncStorage for offline persistence
- Optimistic UI updates with fallbacks

### Performance Optimizations
- FlatList for efficient rendering
- Memoized computations for filtered data
- Skeleton loaders for perceived performance
- Lazy loading and caching strategies

### Error Handling
- Network error recovery
- Graceful degradation with mock data
- User-friendly error messages


## Key Components

### SportsDropdown
- Fetches and displays sports options
- Handles selection changes
- Includes loading states

### CalendarComponent  
- Custom month navigation
- Highlights tournament start dates
- Handles date selection events

### TournamentCard
- Displays tournament information
- Expandable fixture details
- Conditional expand icon display

### SkeletonLoader
- Animated loading placeholders
- Improves perceived performance
- Matches actual content layout

## Dependencies

- **React Native**: Core framework
- **Expo**: Development platform
- **TypeScript**: Type safety
- **react-native-calendars**: Calendar component
- **AsyncStorage**: Local data persistence
- **axios**: HTTP client
- **moment**: Date manipulation
- **react-native-picker-select**: Dropdown component
