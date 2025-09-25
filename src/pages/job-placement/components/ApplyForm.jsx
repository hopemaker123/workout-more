
import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Label from '../../../components/ui/Label';

const ApplyForm = ({ jobTitle, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
    coverLetter: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Submitting application:', { ...formData, jobTitle });
      setSubmissionStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-primary">Apply for {jobTitle}</h2>
              <p className="text-sm text-text-secondary mt-1">Submit your application below.</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
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
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF, DOCX)</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                onChange={handleFileChange}
                required
                accept=".pdf,.doc,.docx"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows="6"
                className="w-full bg-input border border-border rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
                placeholder="Tell us why you're a great fit for this role..."
              ></textarea>
            </div>
          </div>

          <div className="p-6 border-t border-border bg-muted/50 rounded-b-lg">
            {submissionStatus === 'success' && (
              <div className="bg-success/10 border border-success/20 text-success text-sm p-3 rounded-lg text-center mb-4">
                Application submitted successfully!
              </div>
            )}
            {submissionStatus === 'error' && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg text-center mb-4">
                Something went wrong. Please try again.
              </div>
            )}
            <div className="flex items-center justify-end space-x-4">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Icon name="Loader" className="animate-spin mr-2" size={16} />
                        Submitting...
                    </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// You might need an Icon component. If you don't have one, here's a placeholder.
// You should replace this with your actual Icon component.
const Icon = ({ name, size = 16, className = '' }) => {
  const icons = {
    X: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    Loader: (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
    )
  };
  return icons[name] || null;
};
export default ApplyForm;
