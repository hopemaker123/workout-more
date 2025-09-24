import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningPathCard = ({ 
  learningPath, 
  onStartPath, 
  onViewDetails, 
  className = '' 
}) => {
  const getVerticalColor = (vertical) => {
    switch (vertical) {
      case 'job-marketplace': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'marketing-services': return 'text-green-600 bg-green-50 border-green-200';
      case 'real-estate': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'cross-vertical': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-700 bg-green-100';
      case 'intermediate': return 'text-yellow-700 bg-yellow-100';
      case 'advanced': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-professional hover:shadow-elevated transition-all duration-base ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getVerticalColor(learningPath?.vertical)}`}>
              {learningPath?.verticalName}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(learningPath?.difficulty)}`}>
              {learningPath?.difficulty}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {learningPath?.title}
          </h3>
          
          <p className="text-sm text-text-secondary mb-3">
            {learningPath?.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-1 ml-4">
          <Icon name="BookOpen" size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">{learningPath?.courseCount} Courses</span>
        </div>
      </div>
      {/* Progress */}
      {learningPath?.progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text-secondary">Progress</span>
            <span className="text-primary font-medium">{learningPath?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-base"
              style={{ width: `${learningPath?.progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {/* Course Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Included Courses:</h4>
        <div className="space-y-2">
          {learningPath?.courses?.slice(0, 3)?.map((course, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                course?.completed 
                  ? 'bg-success text-success-foreground' 
                  : course?.inProgress 
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {course?.completed ? (
                  <Icon name="Check" size={12} />
                ) : (
                  index + 1
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">{course?.title}</p>
                <p className="text-xs text-text-secondary">{course?.duration}</p>
              </div>
              
              {course?.inProgress && (
                <div className="w-12 bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-warning h-1 rounded-full"
                    style={{ width: `${course?.progress || 0}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
          
          {learningPath?.courses?.length > 3 && (
            <div className="text-center">
              <button 
                onClick={() => onViewDetails(learningPath)}
                className="text-sm text-primary hover:text-secondary transition-colors duration-base"
              >
                +{learningPath?.courses?.length - 3} more courses
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Icon name="Clock" size={14} className="mr-1" />
            {learningPath?.totalDuration}
          </div>
          
          <div className="flex items-center">
            <Icon name="Users" size={14} className="mr-1" />
            {learningPath?.enrolledCount} enrolled
          </div>
          
          {learningPath?.rating && (
            <div className="flex items-center">
              <Icon name="Star" size={14} className="mr-1 text-yellow-500" />
              {learningPath?.rating}
            </div>
          )}
        </div>
        
        {learningPath?.certificate && (
          <div className="flex items-center text-accent">
            <Icon name="Award" size={14} className="mr-1" />
            <span className="text-xs">Certificate</span>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="flex space-x-3">
        <Button
          variant="default"
          size="sm"
          iconName={learningPath?.progress > 0 ? "Play" : "BookOpen"}
          iconPosition="left"
          onClick={() => onStartPath(learningPath)}
          className="flex-1"
        >
          {learningPath?.progress > 0 ? 'Continue Path' : 'Start Learning Path'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(learningPath)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default LearningPathCard;