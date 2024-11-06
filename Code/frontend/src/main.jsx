import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Navbar from './Layouts/Navbar';
import LeftSideBar from './Layouts/LeftSideBar';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <LeftSideBar/>
  </StrictMode>,
)
