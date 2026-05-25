import {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';

const ResumeUploader =({onFileSelect}) =>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragOver,setDragOver]=useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const inputRef = useRef(null);

    const validateFile =(file)=>{
        if(file.type!=='application/pdf'){
            setError('Only PDF files are allowed');
            return false;
        }

        if(file.size>5*1024*1024){
            setError('File size should be less than 5MB');
            return false;
        }

        return true;
    }

    const handleFile = (file) =>{
        setError(null);

        if(validateFile(file)){
            setSelectedFile(file);
            onFileSelect?.(file);
            navigate('/results', { state: { file } })
        }

    }

    const handleDrop =(e) =>{
        e.preventDefault();
        setDragOver(false);

        const file=e.dataTransfer.files[0];
        if(file) handleFile(file);

    };

    const handleChange =(e) =>{
        const file=e.target.files[0];
        if(file) handleFile(file);

    };

    const handleRemove =() =>{
        setSelectedFile(null);
        setError(null);

        inputRef.current.value="";
    }

    return(
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`w-full max-w-lg border-2 border-dashed rounded-2xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-all duration-200
          ${dragOver ? "border-blue-400 bg-blue-950/30" : "border-gray-600 bg-gray-900 hover:border-blue-500 hover:bg-gray-800"}`}
      >
        {/* Icon */}
        <div className="text-5xl">📄</div>

        {/* Text */}
        {!selectedFile ? (
          <>
            <p className="text-white text-lg font-semibold">Drag & drop your resume here</p>
            <p className="text-gray-400 text-sm">or click to browse</p>
            <p className="text-gray-600 text-xs">PDF only · Max 5MB</p>
          </>
        ) : (
          <>
            <p className="text-green-400 font-semibold text-base">{selectedFile.name}</p>
            <p className="text-gray-400 text-sm">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            <button
              onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
            >
              Remove file
            </button>
          </>
        )}
      </div>

      {/* Error */}
      {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
      />
    </div>
    )                       
}

export default ResumeUploader;