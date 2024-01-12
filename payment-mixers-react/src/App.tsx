import React from 'react';
import './App.css';
import Checkout from './component/checkout';

function App() {
  return (
    <div className="App">
      <p style={{ margin: '16px 0' }}>
        Payment mixers react
      </p>
      <Checkout />
    </div>
  );
}

export default App;
