import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ContentPage from './pages/ContentPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    // The Routes component is the top-level container
    <Routes>
      
      {/* 2. Create the parent layout route. All nested routes will use this layout. */}
      <Route path="/" element={<AppLayout />}>

        {/* 3. Define the child routes. The "index" route is the default for the parent's path. */}
        <Route index element={<HomePage />} />
        <Route path="content" element={<ContentPage />} />
        
        {/* You can add more pages here later, and they'll all get the same layout */}
        {/* <Route path="about" element={<AboutPage />} /> */}
        {/* <Route path="settings" element={<SettingsPage />} /> */}

      </Route>

      {/* You could also define routes outside the layout if needed, e.g., a full-screen login page */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
      
    </Routes>
  );
}

export default App;