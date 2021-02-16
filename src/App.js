import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { requestLoginThunk } from 'modules/auth';
import GlobalLayout from 'pages/GlobalLayout';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);

  if(!isLogin){
    return (
      <div>
        <button 
          onClick={() => dispatch(requestLoginThunk('limwondong'))}
        >
          로그인
        </button>
      </div>
    )
  }

  return (
    <Router>
      <GlobalLayout />
    </Router>
  );
}

export default App;
