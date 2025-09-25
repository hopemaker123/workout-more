
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Label from '../../components/ui/Label';
import Icon from '../../components/AppIcon';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Mock API call
    try {
      // In a real app, you'd call an API here:
      // const { token } = await login(formData);
      // For demonstration purposes, we'll simulate a successful login.
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (formData.email === 'test@example.com' && formData.password === 'password') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-16">
          <div className="container-professional text-center">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-xl opacity-90">Login to access your professional dashboard.</p>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-professional">
            <div className="max-w-md mx-auto">
              <div className="card-professional p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 text-center">Login to your Account</h2>
                
                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg text-center mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <Button type="submit" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Icon name="Loader" className="animate-spin mr-2" size={16} />
                            Logging in...
                        </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-text-secondary">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-primary hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
