// import { observer, inject } from 'mobx-react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
import About from './about_components/about'
import React from 'react'

function App() {
  return (
    <div>
      <About/>
    </div>
  )
}

export default App