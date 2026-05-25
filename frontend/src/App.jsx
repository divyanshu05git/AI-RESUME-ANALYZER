import './App.css'
import ResumeUploader from './components/ResumeUploader'
import ResultPage from './components/ResultPage'
import {Routes , Route} from 'react-router-dom'

function App() { 
  return (
       <Routes>
         <Route path="/" element={<ResumeUploader />} />
         <Route path="/results" element={<ResultPage />} />
       </Routes>
        
  )
}

export default App
