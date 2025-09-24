import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const ServiceModal = ({ service, isOpen, onClose, onContact, onHire }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [message, setMessage] = useState('');

  if (!isOpen || !service) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'packages', label: 'Packages', icon: 'Package' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'provider', label: 'Provider', icon: 'User' }
  ];

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: service?.startingPrice,
      deliveryTime: '3 days',
      revisions: 2,
      features: [
        'Initial consultation',
        'Basic service delivery',
        '2 revisions included',
        'Email support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: service?.startingPrice * 2,
      deliveryTime: '5 days',
      revisions: 5,
      features: [
        'Everything in Basic',
        'Extended consultation',
        '5 revisions included',
        'Priority support',
        'Additional deliverables'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: service?.startingPrice * 3,
      deliveryTime: '7 days',
      revisions: 'Unlimited',
      features: [
        'Everything in Standard',
        'Comprehensive strategy',
        'Unlimited revisions',
        '24/7 support',
        'Premium deliverables',
        'Post-delivery support'
      ]
    }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      date: '2024-09-20',
      comment: `Exceptional service! The provider delivered exactly what was promised and exceeded my expectations. Communication was clear throughout the project.`
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 5,
      date: '2024-09-18',
      comment: `Outstanding work quality and very professional approach. Would definitely recommend and hire again for future projects.`
    },
    {
      id: 3,
      author: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 4,
      date: '2024-09-15',
      comment: `Great experience overall. The service was delivered on time and met all requirements. Minor revisions were handled quickly.`
    }
  ];

  const handleHire = () => {
    const selectedPkg = packages?.find(pkg => pkg?.id === selectedPackage);
    onHire(service, selectedPkg, message);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-xl rounded-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={service?.provider?.avatar}
                  alt={service?.provider?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary">{service?.title}</h2>
                <p className="text-sm text-text-secondary">by {service?.provider?.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-base"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-base ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 max-h-96 overflow-y-auto scrollbar-professional">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">Service Description</h3>
                    <p className="text-text-secondary leading-relaxed mb-4">{service?.description}</p>
                    
                    <h4 className="font-medium text-text-primary mb-2">What you'll get:</h4>
                    <ul className="space-y-2">
                      {service?.deliverables?.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{item}</span>
                        </li>
                      )) || [
                        'Professional service delivery',
                        'Quality assurance',
                        'Timely completion',
                        'Customer support'
                      ]?.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="bg-muted rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-text-primary mb-3">Service Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-text-secondary">Category:</span>
                          <span className="text-sm font-medium text-text-primary">{service?.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-text-secondary">Delivery Time:</span>
                          <span className="text-sm font-medium text-text-primary">{service?.deliveryTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-text-secondary">Revisions:</span>
                          <span className="text-sm font-medium text-text-primary">{service?.revisions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-text-secondary">Starting Price:</span>
                          <span className="text-lg font-bold text-primary">${service?.startingPrice}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {service?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Choose Your Package</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages?.map((pkg) => (
                    <div
                      key={pkg?.id}
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-base ${
                        selectedPackage === pkg?.id
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      } ${pkg?.popular ? 'ring-2 ring-accent' : ''}`}
                      onClick={() => setSelectedPackage(pkg?.id)}
                    >
                      {pkg?.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center mb-4">
                        <h4 className="font-semibold text-text-primary">{pkg?.name}</h4>
                        <div className="text-2xl font-bold text-primary mt-2">${pkg?.price}</div>
                        <p className="text-sm text-text-secondary">{pkg?.deliveryTime} delivery</p>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {pkg?.features?.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="Check" size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-text-secondary">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="text-center">
                        <div className="text-sm text-text-secondary">
                          {pkg?.revisions} revisions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-text-primary ml-1">{service?.provider?.rating}</span>
                    </div>
                    <span className="text-sm text-text-secondary">({reviews?.length} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {reviews?.map((review) => (
                    <div key={review?.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={review?.avatar}
                            alt={review?.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-text-primary">{review?.author}</h4>
                            <span className="text-xs text-text-secondary">{review?.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)]?.map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={14}
                                className={i < review?.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed">{review?.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'provider' && (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={service?.provider?.avatar}
                      alt={service?.provider?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-text-primary">{service?.provider?.name}</h3>
                      {service?.provider?.verified && (
                        <Icon name="BadgeCheck" size={20} className="text-blue-500" />
                      )}
                    </div>
                    <p className="text-text-secondary mb-3">{service?.provider?.title || 'Professional Service Provider'}</p>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center">
                        <Icon name="Star" size={14} className="text-yellow-400 fill-current mr-1" />
                        <span>{service?.provider?.rating} rating</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Briefcase" size={14} className="mr-1" />
                        <span>{service?.provider?.completedJobs} jobs completed</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        <span>Member since 2022</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-2">About</h4>
                  <p className="text-text-secondary leading-relaxed">
                    {service?.provider?.bio || `Experienced professional specializing in ${service?.category?.toLowerCase()} services. Committed to delivering high-quality results and exceptional customer service. With years of experience in the industry, I help businesses and individuals achieve their goals through tailored solutions.`}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {(service?.provider?.skills || service?.tags)?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-text-secondary">Selected Package</div>
                  <div className="text-lg font-bold text-primary">
                    ${packages?.find(pkg => pkg?.id === selectedPackage)?.price}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => onContact(service)}
                >
                  Contact Provider
                </Button>
                <Button
                  variant="default"
                  iconName="ShoppingCart"
                  iconPosition="left"
                  onClick={handleHire}
                >
                  Hire Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;