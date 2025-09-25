import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { fetchVerticals } from '../../../utils/api';

const VerticalShowcase = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const [verticals, setVerticals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = ['primary', 'secondary', 'accent'];

  useEffect(() => {
    const getVerticals = async () => {
      try {
        setLoading(true);
        const data = await fetchVerticals();
        setVerticals(data || []);
        setError(null);
      } catch (err) {
        setError('Failed to load verticals. Please make sure the database is running and accessible.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getVerticals();
  }, []);

  const handleCtaAction = (vertical) => {
    navigate('/services-marketplace');
  };

  if (loading) {
    return (
      <section className="section-spacing bg-background">
        <div className="container-professional text-center">
          <p>Loading verticals...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-spacing bg-background">
        <div className="container-professional text-center text-red-500">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-background">
      <div className="container-professional">
        <div className="text-center mb-16">
          <h2 className="text-value-prop text-primary mb-4">
            Three Verticals, Infinite Possibilities
          </h2>
          <p className="text-body-large text-text-secondary max-w-3xl mx-auto">
            WorkHub Pro breaks traditional silos by integrating job opportunities, marketing services, and real estate solutions into one powerful platform.
          </p>
        </div>

        {verticals.length > 0 ? (
          <div className="grid-convergence">
            {verticals.map((vertical, index) => (
              <div
                key={vertical.id}
                className={`group relative bg-card rounded-xl border border-border shadow-professional hover:shadow-floating transition-all duration-base cursor-pointer overflow-hidden`}
                onMouseEnter={() => setHoveredCard(vertical.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCtaAction(vertical)}
              >
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 bg-${colors[index % colors.length]} rounded-xl flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-base`}>
                      <Icon 
                        name={vertical.icon_name}
                        size={28} 
                        color="white"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-base">
                      {vertical.name}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {vertical.description}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    fullWidth
                    className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-base"
                  >
                    Explore
                  </Button>
                </div>

                <div className={`absolute top-4 right-4 w-3 h-3 bg-${colors[index % colors.length]} rounded-full opacity-0 group-hover:opacity-100 animate-opportunity-pulse transition-opacity duration-base`}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-text-secondary">No verticals to display.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-bold text-primary mb-4">
              The Power of Integration
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Discover synergies between job opportunities, marketing clients, and real estate investments. Our platform intelligence identifies cross-vertical opportunities that maximize your professional potential.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={20} className="text-accent" />
                <span className="text-sm font-medium">Smart Recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={20} className="text-secondary" />
                <span className="text-sm font-medium">Opportunity Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={20} className="text-primary" />
                <span className="text-sm font-medium">Revenue Synergies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalShowcase;