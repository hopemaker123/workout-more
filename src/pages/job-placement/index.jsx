
import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ApplyForm from './components/ApplyForm';
import Button from '../../components/ui/Button';

const JobPlacement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    minSalary: '',
    maxSalary: '',
    sortBy: 'newest',
  });
  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`http://localhost:3001/api/jobs?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsApplyFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsApplyFormOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Job Placement</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                {/* Add filter controls here */}
              </div>
            </div>

            <div className="col-span-3">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                        <p className="text-gray-600 mb-2">{job.location}</p>
                        <p className="text-lg font-bold text-primary mb-4">${job.salary.toLocaleString()}</p>
                    </div>
                    <Button onClick={() => handleApplyClick(job)}>Apply Now</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      {isApplyFormOpen && selectedJob && (
        <ApplyForm jobTitle={selectedJob.title} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default JobPlacement;
