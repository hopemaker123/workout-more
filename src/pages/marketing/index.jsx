import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';

const Marketing = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minBudget: '',
    maxBudget: '',
    sortBy: 'newest',
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`http://localhost:3001/api/marketing?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch marketing campaigns');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Marketing Campaigns</h1>

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
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-2">{campaign.title}</h2>
                    <p className="text-gray-600 mb-2">{campaign.category}</p>
                    <p className="text-lg font-bold text-primary">${campaign.budget.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketing;
