import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PortfolioSection = ({ profile, isOwnProfile = true }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const portfolioCategories = [
    { id: 'all', name: 'All Projects', icon: 'Grid' },
    { id: 'web', name: 'Web Development', icon: 'Globe' },
    { id: 'marketing', name: 'Marketing', icon: 'TrendingUp' },
    { id: 'design', name: 'Design', icon: 'Palette' },
    { id: 'realestate', name: 'Real Estate', icon: 'Home' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? profile?.portfolio 
    : profile?.portfolio?.filter(project => project?.category === selectedCategory);

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Portfolio</h3>
          {isOwnProfile && (
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              Add Project
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {portfolioCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-base ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-professional'
                  : 'bg-muted text-text-primary hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              <Icon 
                name={category?.icon} 
                size={16} 
                className={selectedCategory === category?.id ? 'text-primary-foreground' : 'text-text-secondary'}
              />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project, index) => (
            <div key={index} className="group cursor-pointer" onClick={() => openProjectModal(project)}>
              <div className="bg-muted rounded-lg overflow-hidden shadow-professional hover:shadow-elevated transition-all duration-base">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project?.image}
                    alt={project?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-base"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-base"></div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      project?.category === 'web' ? 'bg-primary/90 text-primary-foreground' :
                      project?.category === 'marketing' ? 'bg-secondary/90 text-secondary-foreground' :
                      project?.category === 'design' ? 'bg-accent/90 text-accent-foreground' :
                      'bg-success/90 text-success-foreground'
                    }`}>
                      {project?.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-base">
                    <div className="bg-white/90 rounded-full p-3">
                      <Icon name="Eye" size={20} className="text-primary" />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {project?.title}
                  </h4>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {project?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{project?.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{project?.views}</span>
                      </div>
                    </div>
                    
                    {project?.featured && (
                      <div className="flex items-center space-x-1 text-accent">
                        <Icon name="Star" size={12} className="fill-current" />
                        <span className="text-xs font-medium">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Technologies Used */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project?.technologies?.slice(0, 3)?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-background text-text-secondary text-xs rounded border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project?.technologies?.length > 3 && (
                      <span className="px-2 py-1 bg-background text-text-secondary text-xs rounded border border-border">
                        +{project?.technologies?.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-floating border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-semibold text-text-primary">{selectedProject?.title}</h3>
              <button
                onClick={closeProjectModal}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="X" size={20} className="text-text-secondary" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Project Image */}
              <div className="mb-6">
                <Image
                  src={selectedProject?.image}
                  alt={selectedProject?.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-text-primary mb-3">Project Overview</h4>
                  <p className="text-text-primary mb-6">{selectedProject?.fullDescription}</p>

                  {/* Key Features */}
                  <h4 className="font-semibold text-text-primary mb-3">Key Features</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedProject?.features?.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Results */}
                  <h4 className="font-semibold text-text-primary mb-3">Results & Impact</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedProject?.results?.map((result, index) => (
                      <div key={index} className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{result?.value}</div>
                        <div className="text-sm text-text-secondary">{result?.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Project Info */}
                  <div className="bg-muted rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-text-primary mb-3">Project Info</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Category:</span>
                        <span className="text-text-primary font-medium capitalize">{selectedProject?.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Duration:</span>
                        <span className="text-text-primary font-medium">{selectedProject?.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Client:</span>
                        <span className="text-text-primary font-medium">{selectedProject?.client}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Date:</span>
                        <span className="text-text-primary font-medium">{selectedProject?.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject?.technologies?.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {selectedProject?.liveUrl && (
                      <Button
                        variant="default"
                        fullWidth
                        iconName="ExternalLink"
                        iconPosition="right"
                      >
                        View Live Project
                      </Button>
                    )}
                    {selectedProject?.githubUrl && (
                      <Button
                        variant="outline"
                        fullWidth
                        iconName="Github"
                        iconPosition="left"
                      >
                        View Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;