import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner'; // Import Toaster

function App() {
  return (
    <>
      <Toaster 
        position="top-center"
        richColors
        closeButton
        duration={4000}
        expand={false}
      />
      
      <Outlet />
    </>
  );
}

export default App;