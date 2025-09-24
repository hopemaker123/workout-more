import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExperienceSection = ({ profile, isOwnProfile = true }) => {
  const [selectedType, setSelectedType] = useState('all');

  const experienceTypes = [
    { id: 'all', name: 'All Experience', icon: 'Briefcase' },
    { id: 'job', name: 'Employment', icon: 'Building' },
    { id: 'freelance', name: 'Freelance', icon: 'User' },
    { id: 'project', name: 'Projects', icon: 'Folder' }
  ];

  const filteredExperience = selectedType === 'all' 
    ? profile?.experience 
    : profile?.experience?.filter(exp => exp?.type === selectedType);

  const getExperienceIcon = (type) => {
    const icons = {
      'job': 'Building',
      'freelance': 'User',
      'project': 'Folder',
      'volunteer': 'Heart'
    };
    return icons?.[type] || 'Briefcase';
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    const months = (end?.getFullYear() - start?.getFullYear()) * 12 + (end?.getMonth() - start?.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} months`;
  };

  return (
    <div className="space-y-6">
      {/* Experience Header */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Professional Experience</h3>
          {isOwnProfile && (
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              Add Experience
            </Button>
          )}
        </div>

        {/* Experience Type Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {experienceTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => setSelectedType(type?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-base ${
                selectedType === type?.id
                  ? 'bg-primary text-primary-foreground shadow-professional'
                  : 'bg-muted text-text-primary hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              <Icon 
                name={type?.icon} 
                size={16} 
                className={selectedType === type?.id ? 'text-primary-foreground' : 'text-text-secondary'}
              />
              <span>{type?.name}</span>
            </button>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {filteredExperience?.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline Line */}
              {index < filteredExperience?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
              )}
              
              <div className="flex items-start space-x-4">
                {/* Timeline Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getExperienceIcon(exp?.type)} size={20} color="white" />
                </div>
                
                {/* Experience Content */}
                <div className="flex-1 bg-muted rounded-lg p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-text-primary">{exp?.position}</h4>
                      <p className="text-primary font-medium">{exp?.company}</p>
                      <p className="text-sm text-text-secondary">{exp?.location}</p>
                    </div>
                    
                    <div className="text-right mt-2 lg:mt-0">
                      <div className="text-sm font-medium text-text-primary">
                        {exp?.startDate} - {exp?.endDate}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {calculateDuration(exp?.startDate, exp?.endDate)}
                      </div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                        exp?.type === 'job' ? 'bg-primary/10 text-primary' :
                        exp?.type === 'freelance'? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                      } font-medium capitalize`}>
                        {exp?.type}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-text-primary mb-4">{exp?.description}</p>
                  
                  {/* Key Achievements */}
                  {exp?.achievements && exp?.achievements?.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-text-primary mb-2">Key Achievements:</h5>
                      <ul className="space-y-1">
                        {exp?.achievements?.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start space-x-2 text-sm text-text-secondary">
                            <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Skills Used */}
                  {exp?.skills && exp?.skills?.length > 0 && (
                    <div>
                      <h5 className="font-medium text-text-primary mb-2">Skills Used:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp?.skills?.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-background text-text-primary text-xs rounded-lg border border-border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {isOwnProfile && (
                    <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
                      <Button variant="ghost" size="xs" iconName="Edit">
                        Edit
                      </Button>
                      <Button variant="ghost" size="xs" iconName="Trash2">
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Education */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Education</h3>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" iconName="Plus">
              Add
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          {profile?.education?.map((edu, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h4 className="font-semibold text-text-primary">{edu?.degree}</h4>
                    <p className="text-primary font-medium">{edu?.institution}</p>
                    <p className="text-sm text-text-secondary">{edu?.location}</p>
                  </div>
                  <div className="text-right mt-2 lg:mt-0">
                    <div className="text-sm font-medium text-text-primary">{edu?.year}</div>
                    {edu?.gpa && (
                      <div className="text-xs text-text-secondary">GPA: {edu?.gpa}</div>
                    )}
                  </div>
                </div>
                
                {edu?.description && (
                  <p className="text-sm text-text-secondary mt-2">{edu?.description}</p>
                )}
                
                {edu?.honors && edu?.honors?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {edu?.honors?.map((honor, honorIndex) => (
                      <span
                        key={honorIndex}
                        className="px-2 py-1 bg-success/10 text-success text-xs rounded-lg font-medium"
                      >
                        {honor}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;