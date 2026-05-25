import {useLocation,useNavigate} from 'react-router-dom'
import {useEffect,useState} from 'react'

const STEPS=['Uploading','Extracting Text','Analyzing Resume']

function sleep(){
    return new Promise((resolve)=>setTimeout(resolve,1000));
}

export default function ResultPage(){
    const { state } = useLocation();
    const navigate=useNavigate();

    const [currentStep,setCurrentStep]=useState(0);
    const [loading,setLoading]=useState(true);
    const [result,setResult]=useState(null);
    const [error,setError]=useState(null);

    const file=state?.file;

    useEffect(()=>{
        if(!file){
            navigate('/');
            return;
        }
        let cancelled = false;

        async function analyzeResume(){
            try{
                setLoading(true);
                setError(null);
                setCurrentStep(0);

                await sleep();
                if (cancelled) return;
                setCurrentStep(1);

                await sleep();
                if (cancelled) return;
                setCurrentStep(2);

                await sleep();
                if (cancelled) return;

                // Replace this with the API response when the backend is ready.
                setResult(mockResults);
            } 
            catch(err){
                if (!cancelled) {
                    setError(err.message);
                }
            }
            finally{
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        analyzeResume();

        return () => {
            cancelled = true;
        }
    },[file, navigate]);

    if(loading){
        return(
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-8">
                <p className="text-white text-xl font-semibold">Analyzing your resume...</p>

                {/* Steps */}
                <div className="flex flex-col gap-4 w-full max-w-sm">
                {STEPS.map((step, index) => (
                    <div key={step} className="flex items-center gap-4">
                    {/* Circle */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                        ${index < currentStep ? 'bg-green-500 text-white' : ''}
                        ${index === currentStep ? 'bg-blue-500 text-white animate-pulse' : ''}
                        ${index > currentStep ? 'bg-gray-700 text-gray-400' : ''}
                    `}>
                        {index < currentStep ? '✓' : index + 1}
                    </div>

                    {/* Label */}
                    <span className={`text-sm font-medium transition-all duration-300
                        ${index < currentStep ? 'text-green-400' : ''}
                        ${index === currentStep ? 'text-blue-400' : ''}
                        ${index > currentStep ? 'text-gray-500' : ''}
                    `}>
                        {step}
                    </span>
                    </div>
                ))}
                </div>
            </div>
        )
    }

    return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Resume Analysis</h1>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-400 hover:text-blue-300 underline"
          >
            ← Analyze another
          </button>
        </div>

        {/* ATS Score */}
        <div className="bg-gray-900 rounded-2xl p-6 flex flex-col items-center gap-2">
          <p className="text-gray-400 text-sm">ATS Score</p>
          <p className={`text-6xl font-bold ${result.atsScore >= 70 ? 'text-green-400' : result.atsScore >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
            {result.atsScore}<span className="text-2xl text-gray-500">/100</span>
          </p>
        </div>

        {/* Skills */}
        <ResultSection title="🛠 Extracted Skills">
          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill) => (
              <span key={skill} className="bg-blue-900/50 text-blue-300 text-sm px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </ResultSection>

        {/* Experience */}
        <ResultSection title="💼 Work Experience Summary">
          <p className="text-gray-300 text-sm leading-relaxed">{result.experience}</p>
        </ResultSection>

        {/* Education */}
        <ResultSection title="🎓 Education">
          <p className="text-gray-300 text-sm leading-relaxed">{result.education}</p>
        </ResultSection>

        {/* Suggestions */}
        <ResultSection title="💡 Suggestions & Missing Sections">
          <ul className="flex flex-col gap-2">
            {result.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-yellow-400 mt-0.5">⚠</span> {s}
              </li>
            ))}
          </ul>
        </ResultSection>

      </div>
    </div>
  )


}

const ResultSection = ({ title, children }) => (
  <div className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </div>
)

// Mock data until backend is ready
const mockResults = {
  atsScore: 72,
  skills: ['React', 'JavaScript', 'Node.js', 'REST APIs', 'Git', 'Tailwind CSS'],
  experience: 'Worked as a Frontend Developer for 2 years. Built responsive UIs using React and integrated REST APIs. Collaborated with backend teams in an agile environment.',
  education: 'B.Tech in Computer Science — XYZ University (2020–2024)',
  suggestions: [
    'Add a dedicated Skills section with more keywords',
    'Missing a LinkedIn or GitHub profile link',
    'Quantify achievements (e.g. "improved load time by 30%")',
    'Consider adding a professional summary at the top',
  ]
}
