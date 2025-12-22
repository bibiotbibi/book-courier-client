import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './routers/router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvaider from './context/AuthContext/AuthProvaider.jsx'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <div>
   <QueryClientProvider client={queryClient}>
     <AuthProvaider>
      <RouterProvider router={router} />
    </AuthProvaider>
     <Toaster position='top-right' reverseOrder={false} />
     <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  </div>,
)
