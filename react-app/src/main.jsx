/** TODO npm install @mui/material @emotion/react @emotion/styled react react-dom @mui/icons-material react-router react-router-dom */
// TODO - make .env with VITE_TMDB_API_KEY=... and import to Netlify
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
)
