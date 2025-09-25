
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Label from '../../components/ui/Label';
import Checkbox from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreed: false,
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      setError('You must agree to the terms and services.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    // Mock API call
    try {
      // In a real app, you'd call an API here:
      // await register(formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/login');
    } catch (err) {
      setError('Error registering. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-16">
          <div className="container-professional text-center">
            <h1 className="text-4xl font-bold mb-2">Create your Account</h1>
            <p className="text-xl opacity-90">Join our community of professionals and unlock new opportunities.</p>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-professional">
            <div className="max-w-md mx-auto">
              <div className="card-professional p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 text-center">Get Started for Free</h2>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg text-center mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
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
                    <Label htmlFor="password">Password</Label>
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

                  <div className="flex items-start space-x-3">
                    <Checkbox id="agreed" name="agreed" checked={formData.agreed} onChange={handleChange} />
                    <div className="-mt-1">
                        <Label htmlFor="agreed">I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link></Label>
                        <p className="text-sm text-text-secondary">and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
                    </div>
                  </div>
                  
                  <Button type="submit" fullWidth disabled={isSubmitting || !formData.agreed}>
                    {isSubmitting ? (
                        <>
                            <Icon name="Loader" className="animate-spin mr-2" size={16} />
                            Creating Account...
                        </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-text-secondary">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:underline">
                      Log in
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

export default Register;
