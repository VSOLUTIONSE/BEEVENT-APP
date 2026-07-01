import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import { TRPCProvider } from "@/providers/trpc"
import { Agentation } from 'agentation'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <TRPCProvider>
        <App />
        {import.meta.env.DEV && <Agentation />}
      </TRPCProvider>
    </HashRouter>
  </StrictMode>,
)
