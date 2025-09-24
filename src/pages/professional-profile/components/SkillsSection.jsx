import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsSection = ({ profile, isOwnProfile = true }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: 'Grid' },
    { id: 'technical', name: 'Technical', icon: 'Code' },
    { id: 'marketing', name: 'Marketing', icon: 'TrendingUp' },
    { id: 'business', name: 'Business', icon: 'Briefcase' },
    { id: 'creative', name: 'Creative', icon: 'Palette' }
  ];

  const getSkillLevel = (level) => {
    const levels = {
      'beginner': { color: 'text-warning', bg: 'bg-warning/10', width: '25%' },
      'intermediate': { color: 'text-secondary', bg: 'bg-secondary/10', width: '50%' },
      'advanced': { color: 'text-primary', bg: 'bg-primary/10', width: '75%' },
      'expert': { color: 'text-success', bg: 'bg-success/10', width: '100%' }
    };
    return levels?.[level] || levels?.intermediate;
  };

  const filteredSkills = selectedCategory === 'all' 
    ? profile?.skills 
    : profile?.skills?.filter(skill => skill?.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Skills Overview */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Skills & Expertise</h3>
          {isOwnProfile && (
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              Add Skill
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {skillCategories?.map((category) => (
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills?.map((skill, index) => {
            const levelInfo = getSkillLevel(skill?.level);
            return (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-text-primary">{skill?.name}</h4>
                    {skill?.verified && (
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    )}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${levelInfo?.bg} ${levelInfo?.color} font-medium capitalize`}>
                    {skill?.level}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-slow ${
                      skill?.level === 'expert' ? 'bg-gradient-to-r from-success to-primary' :
                      skill?.level === 'advanced' ? 'bg-primary' :
                      skill?.level === 'intermediate' ? 'bg-secondary' : 'bg-warning'
                    }`}
                    style={{ width: levelInfo?.width }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{skill?.experience} experience</span>
                  {skill?.endorsements > 0 && (
                    <span className="text-primary font-medium">{skill?.endorsements} endorsements</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Certifications</h3>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" iconName="Plus">
              Add
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {profile?.certifications?.map((cert, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Award" size={20} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{cert?.name}</h4>
                <p className="text-sm text-text-secondary">{cert?.issuer}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                  <span>Issued: {cert?.issueDate}</span>
                  {cert?.expiryDate && <span>Expires: {cert?.expiryDate}</span>}
                </div>
                {cert?.credentialId && (
                  <div className="mt-2">
                    <Button variant="outline" size="xs" iconName="ExternalLink">
                      Verify
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Skill Assessments */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Skill Assessments</h3>
          {isOwnProfile && (
            <Button variant="outline" size="sm" iconName="Play" iconPosition="left">
              Take Assessment
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile?.assessments?.map((assessment, index) => (
            <div key={index} className="text-center p-4 bg-muted rounded-lg">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">{assessment?.score}%</span>
              </div>
              <h4 className="font-medium text-text-primary">{assessment?.skill}</h4>
              <p className="text-sm text-text-secondary">Completed {assessment?.date}</p>
              <div className="mt-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  assessment?.score >= 90 ? 'bg-success/10 text-success' :
                  assessment?.score >= 70 ? 'bg-primary/10 text-primary': 'bg-warning/10 text-warning'
                } font-medium`}>
                  {assessment?.score >= 90 ? 'Expert' : assessment?.score >= 70 ? 'Proficient' : 'Intermediate'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;