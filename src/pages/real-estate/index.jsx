import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';

const RealEstate = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    minBathrooms: '',
    sortBy: 'newest',
  });

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`http://localhost:3001/api/real-estate?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
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
          <h1 className="text-3xl font-bold mb-8">Real Estate</h1>

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
                {properties.map((property) => (
                  <div key={property.id} className="bg-white p-4 rounded-lg shadow-md">
                    <img src={property.image_url} alt={property.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-xl font-bold mb-2">{property.title}</h2>
                    <p className="text-gray-600 mb-2">{property.location}</p>
                    <p className="text-lg font-bold text-primary">${property.price.toLocaleString()}</p>
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

export default RealEstate;
