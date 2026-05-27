import { useState,useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const BACKEND_URL = 'http://localhost:5000';

const LoginPage = () => {
  const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function login(e){
        e.preventDefault();

        const email=emailRef.current?.value;
        const password=passwordRef.current?.value;

        if(!email || !password){
            alert('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try{
            // const response = await axios.post(BACKEND_URL+'/api/login',{
            //     email,
            //     password
            // })
            // const { token } = response.data;
            // localStorage.setItem('token', token);
            alert('Logged in successfully!');
            navigate('/');   
        }
        catch(err){
            alert('Error while logging in');
        }
        finally{
            setLoading(false);
        }
    }
  
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6 px-4">

      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <div className="bg-gray-800 p-3 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="text-white font-semibold text-lg">Resume AI</span>
      </div>

      {/* Card */}
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-white">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to sign in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={login} className="flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                ref={emailRef}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <span className="text-xs text-gray-400 underline underline-offset-4 cursor-pointer hover:text-gray-300">
                  Forgot password?
                </span>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                ref={passwordRef}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-gray-950 hover:bg-gray-200 font-semibold mt-1"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white underline underline-offset-4 hover:text-gray-300">
                Sign up
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-xs text-gray-600 text-center">
        By clicking continue, you agree to our{' '}
        <span className="underline cursor-pointer hover:text-gray-400">Terms of Service</span>{' '}
        and{' '}
        <span className="underline cursor-pointer hover:text-gray-400">Privacy Policy</span>.
      </p>

    </div>
  )
}

export default LoginPage