import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    // This is our main application frame.
    // The background, padding, and flex properties will apply to all pages.
    <div className="bg-slate-100 min-h-screen w-full flex flex-col items-center justify-center">
      
      {/* A placeholder for a future Header component */}
      {/* <Header /> */}

      <main className="w-full h-full flex-grow flex flex-col items-center justify-center">
        {/* The Outlet component is the magic part. */}
        {/* It tells React Router: "Render the active child route's component right here." */}
        <Outlet />
      </main>
      
      {/* A placeholder for a future Footer component */}
      {/* <Footer /> */}

    </div>
  );
};

export default AppLayout;