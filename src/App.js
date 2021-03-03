import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalLayout from 'pages/GlobalLayout';


function App() {
  return (
    <Router>
      <GlobalLayout />
    </Router>
  );
}

export default App;
