import './App.css'
import ResumeUploader from './components/ResumeUploader'
import ResultPage from './components/ResultPage'
import SignupPage from './components/Signup'
import LoginPage from './components/Login'
import {Routes , Route} from 'react-router-dom'


function App() { 
  return (
       <Routes>
         <Route path="/" element={<ResumeUploader />} />
         <Route path="/results" element={<ResultPage />} />
         <Route path="/signup" element={<SignupPage />} />
         <Route path="/login" element={<LoginPage />} />
       </Routes>
        
  )
}

export default App
