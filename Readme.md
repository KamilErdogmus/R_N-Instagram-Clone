# Instagram-Clone in React Native-Expo

## Description

This project is an Instagram clone built using React Native and Expo, replicating the core features of Instagram's mobile app. Users can create accounts via signup or log into existing accounts, view a feed of posts, explore reels, search for content, and manage their profiles. The app features a home page where users can see posts from other users, like, comment, and follow/unfollow them. A separate reels page allows users to watch short-form videos similar to Instagram's Reels feature. The search functionality helps users discover new content and users based on trending topics.

Key features include media uploading, liking, commenting, and navigating between different tabs for the home feed, search, reels, and profile. The profile page displays the user’s uploaded content, followers, and following counts. Additionally, users can play videos, view images in full screen, and manage their profile details. The app is designed to be cross-platform, running on both Android and iOS devices.

Through the integration of various libraries, the app ensures smooth performance, efficient state management, and a rich user experience with features like modal-based comments sections, toast notifications for feedback, and animations for interactive elements.

## Libraries and Tools

- **@expo/vector-icons**: Provides customizable icons used throughout the app for the user interface.
- **@gorhom/bottom-sheet**: Implements bottom sheets for modals and interactive actions.
- **@react-native-community/checkbox**: Adds checkboxes for form elements.
- **@react-navigation/bottom-tabs**: Manages tab-based navigation for the bottom bar.
- **@react-navigation/native**: The core library for screen navigation within the app.
- **@react-navigation/native-stack**: Provides stack-based navigation for screen transitions.
- **@react-navigation/stack**: An alternative stack navigator for screen transitions.
- **@tanstack/react-query**: Handles server state management and asynchronous data fetching.
- **@fawazahmed/react-native-read-more**: A component to toggle long text between expanded and collapsed states.
- **axios**: Used for making HTTP requests to fetch and send data.
- **dayjs**: A lightweight library for date and time manipulation.
- **expo-av**: Provides audio and video playback functionality.
- **expo-checkbox**: Adds checkboxes as native components.
- **expo-font**: Enables custom fonts to be used in the app.
- **expo-linear-gradient**: Implements gradient backgrounds in the UI.
- **expo-status-bar**: Manages the appearance of the device’s status bar.
- **formik**: Simplifies form handling and validation.
- **millify**: Converts large numbers into more readable formats (e.g., 1,000 becomes 1K).
- **nativewind**: Utility-first CSS-like framework for styling React Native components.
- **react-native-animatable**: Adds animations for interactive elements.
- **react-native-dotenv**: Manages environment variables for secure API key handling.
- **react-native-gesture-handler**: Enhances touch gesture handling for interactive UI elements.
- **react-native-image-viewing**: Allows full-screen viewing of images with zoom functionality.
- **react-native-modal**: A customizable modal component for displaying content.
- **react-native-reanimated**: Powers smooth animations within the app.
- **react-native-safe-area-context**: Ensures content is rendered within safe areas like notches and status bars.
- **react-native-screens**: Improves navigation performance by using native screen components.
- **react-native-sound**: Provides sound playback functionality for the app.
- **react-native-swiper**: Implements swipeable carousels for content.
- **react-native-toast-notifications**: Displays toast notifications for user feedback.
- **react-native-video**: A component for playing videos natively.
- **yup**: A schema builder for form validation, often used with Formik.

## API

[API Documentation](https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2)

## Preview

<img src="assets/Insta-GIF.gif" height="500" />

## Installation

To run the project locally follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/KamilErdogmus/R_N-Instagram-Clone.git
```

2. Navigate to the project directory:

```bash
cd your-repository
```

3. Install dependencies:

#### Using npm

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

If you're using MacOS, navigate to the ios folder and install CocoaPods dependencies:

```bash
cd ios
```

```bash
 pod install
```

```bash
 cd ..
```

## Step 1: Start the Metro Server

First, you'll need to start **Metro**, the JavaScript _bundler_ that comes with React Native.

To start Metro, run the following command from the _root_ of your React Native project:

#### Using npm

```bash
npx expo start
```

#### Using Yarn

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

#### Using npm

```bash
npx expo run android
```

#### Using Yarn

```bash
yarn android
```

### For iOS

##### using npm

```bash
npx expo run ios
```

#### Using Yarn

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
