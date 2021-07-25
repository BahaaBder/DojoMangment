
import { observer, inject } from 'mobx-react'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
//CustomerStore
import React from 'react'
import Schedule from './components/Schedule';

function App() {
  return (
    <div>
      <h1>test</h1>
      <Schedule></Schedule>
    </div>
  )
}

export default App

