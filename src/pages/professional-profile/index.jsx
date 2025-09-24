import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import VerticalTabs from './components/VerticalTabs';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import PortfolioSection from './components/PortfolioSection';
import ReviewsSection from './components/ReviewsSection';

const ProfessionalProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Mock profile data
  const profileData = {
    name: "Sarah Johnson",
    title: "Full-Stack Developer & Digital Marketing Strategist",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    connections: 1247,
    rating: 4.9,
    reviews: 156,
    overallRating: 4.8,
    verifications: ['verified', 'premium'],
    stats: {
      profileViews: "2.3k",
      projectsCompleted: 89,
      successRate: 98,
      responseTime: 2
    },
    about: {
      summary: `Passionate full-stack developer and digital marketing strategist with 8+ years of experience building scalable web applications and driving growth through data-driven marketing campaigns. Specialized in React, Node.js, and modern marketing automation tools.`,
      full: `Passionate full-stack developer and digital marketing strategist with 8+ years of experience building scalable web applications and driving growth through data-driven marketing campaigns. Specialized in React, Node.js, and modern marketing automation tools.\n\nI bridge the gap between technical excellence and business growth, helping companies build robust digital products while implementing marketing strategies that convert. My unique combination of development and marketing expertise allows me to create solutions that not only function flawlessly but also drive measurable business results.\n\nCurrently exploring opportunities in real estate technology, combining my technical skills with market analysis to identify promising investment opportunities and develop PropTech solutions.`
    },
    highlights: [
      {
        icon: 'Code',
        title: 'Full-Stack Development',
        description: '8+ years building scalable web applications with modern technologies'
      },
      {
        icon: 'TrendingUp',
        title: 'Growth Marketing',
        description: 'Increased client revenue by 340% through strategic digital campaigns'
      },
      {
        icon: 'Award',
        title: 'Industry Recognition',
        description: 'Top 1% developer on multiple platforms with 98% success rate'
      },
      {
        icon: 'Users',
        title: 'Team Leadership',
        description: 'Led cross-functional teams of 15+ members on enterprise projects'
      }
    ],
    languages: [
      { name: 'English', level: 'Native', proficiency: 5 },
      { name: 'Spanish', level: 'Professional', proficiency: 4 },
      { name: 'French', level: 'Conversational', proficiency: 3 }
    ],
    availability: {
      hoursPerWeek: 40,
      startDate: 'Immediately',
      hourlyRate: 125
    },
    skills: [
      { name: 'React.js', level: 'expert', category: 'technical', verified: true, experience: '5+ years', endorsements: 23 },
      { name: 'Node.js', level: 'expert', category: 'technical', verified: true, experience: '4+ years', endorsements: 18 },
      { name: 'Digital Marketing', level: 'advanced', category: 'marketing', verified: true, experience: '6+ years', endorsements: 31 },
      { name: 'SEO/SEM', level: 'advanced', category: 'marketing', verified: true, experience: '5+ years', endorsements: 27 },
      { name: 'Project Management', level: 'advanced', category: 'business', verified: false, experience: '4+ years', endorsements: 15 },
      { name: 'UI/UX Design', level: 'intermediate', category: 'creative', verified: false, experience: '3+ years', endorsements: 12 }
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        issueDate: 'Mar 2023',
        expiryDate: 'Mar 2026',
        credentialId: 'AWS-CSA-2023-001'
      },
      {
        name: 'Google Analytics Certified',
        issuer: 'Google',
        issueDate: 'Jan 2024',
        expiryDate: 'Jan 2025',
        credentialId: 'GA-CERT-2024-789'
      },
      {
        name: 'Certified Scrum Master',
        issuer: 'Scrum Alliance',
        issueDate: 'Sep 2022',
        expiryDate: 'Sep 2024',
        credentialId: 'CSM-2022-456'
      }
    ],
    assessments: [
      { skill: 'JavaScript', score: 95, date: 'Feb 2024' },
      { skill: 'React', score: 92, date: 'Jan 2024' },
      { skill: 'Marketing Strategy', score: 88, date: 'Dec 2023' }
    ],
    experience: [
      {
        position: 'Senior Full-Stack Developer',
        company: 'TechFlow Solutions',
        location: 'San Francisco, CA',
        startDate: 'Jan 2022',
        endDate: 'Present',
        type: 'job',
        description: `Leading development of enterprise-scale web applications serving 100k+ users. Architected microservices infrastructure that improved system performance by 60% and reduced deployment time by 75%.`,
        achievements: [
          'Increased application performance by 60% through optimization',
          'Led team of 8 developers on critical product launches',
          'Implemented CI/CD pipeline reducing deployment time by 75%',
          'Mentored 5 junior developers, 3 received promotions'
        ],
        skills: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
      },
      {
        position: 'Digital Marketing Consultant',
        company: 'Growth Partners Agency',
        location: 'Remote',
        startDate: 'Mar 2021',
        endDate: 'Dec 2023',
        type: 'freelance',
        description: `Provided strategic digital marketing consulting for 15+ B2B SaaS companies. Developed and executed comprehensive growth strategies that generated $2.3M in additional revenue.`,
        achievements: [
          'Generated $2.3M in additional revenue for clients',
          'Improved average conversion rates by 145%',
          'Managed $500k+ in advertising spend across platforms',
          'Developed proprietary attribution model adopted by 8 clients'
        ],
        skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'CRO', 'Email Marketing']
      },
      {
        position: 'PropTech Innovation Project',
        company: 'Real Estate Ventures',
        location: 'San Francisco, CA',
        startDate: 'Jun 2023',
        endDate: 'Nov 2023',
        type: 'project',
        description: `Developed AI-powered property valuation platform that analyzes market trends and predicts investment opportunities with 87% accuracy.`,
        achievements: [
          'Built ML model with 87% prediction accuracy',
          'Processed 50k+ property records for training data',
          'Created intuitive dashboard for real estate professionals',
          'Secured $150k in seed funding for continued development'
        ],
        skills: ['Python', 'Machine Learning', 'Real Estate Analysis', 'Data Visualization']
      }
    ],
    education: [
      {
        degree: 'Master of Science in Computer Science',
        institution: 'Stanford University',
        location: 'Stanford, CA',
        year: '2018',
        gpa: '3.8',
        description: 'Specialized in Machine Learning and Human-Computer Interaction',
        honors: ['Dean\'s List', 'Graduate Research Assistant']
      },
      {
        degree: 'Bachelor of Science in Marketing',
        institution: 'UC Berkeley',
        location: 'Berkeley, CA',
        year: '2016',
        gpa: '3.9',
        description: 'Magna Cum Laude, Focus on Digital Marketing and Consumer Behavior',
        honors: ['Magna Cum Laude', 'Marketing Honor Society']
      }
    ],
    portfolio: [
      {
        title: 'E-commerce Platform Redesign',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
        description: 'Complete redesign and development of multi-vendor e-commerce platform',
        fullDescription: `Led the complete redesign and redevelopment of a multi-vendor e-commerce platform serving over 50,000 active users. The project involved modernizing the entire tech stack, implementing a microservices architecture, and creating an intuitive user experience that increased conversion rates by 85%.\n\nThe platform now handles over $2M in monthly transactions and has become the leading marketplace in its niche. Key innovations included real-time inventory management, AI-powered product recommendations, and a sophisticated vendor management system.`,
        date: 'Dec 2023',
        views: 1247,
        featured: true,
        technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
        duration: '6 months',
        client: 'MarketPlace Pro',
        liveUrl: 'https://marketplace-pro.com',
        githubUrl: 'https://github.com/sarah/marketplace-pro',
        features: [
          'Multi-vendor marketplace with advanced vendor management',
          'Real-time inventory synchronization across multiple channels',
          'AI-powered product recommendations increasing sales by 35%',
          'Advanced analytics dashboard for vendors and administrators',
          'Mobile-responsive design with PWA capabilities'
        ],
        results: [
          { value: '85%', metric: 'Conversion Increase' },
          { value: '$2M+', metric: 'Monthly Revenue' },
          { value: '50k+', metric: 'Active Users' }
        ]
      },
      {
        title: 'SaaS Growth Campaign',
        category: 'marketing',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        description: 'Multi-channel growth campaign that increased MRR by 340%',
        fullDescription: `Designed and executed a comprehensive growth marketing campaign for a B2B SaaS startup that resulted in a 340% increase in Monthly Recurring Revenue (MRR) over 8 months. The campaign utilized a data-driven approach combining content marketing, paid advertising, email automation, and conversion optimization.\n\nThe strategy focused on identifying high-value customer segments and creating targeted messaging that resonated with their specific pain points. Through continuous testing and optimization, we achieved industry-leading conversion rates and customer acquisition costs.`,
        date: 'Sep 2023',
        views: 892,
        featured: true,
        technologies: ['HubSpot', 'Google Analytics', 'Facebook Ads', 'Mailchimp', 'Hotjar'],
        duration: '8 months',
        client: 'CloudSync Solutions',
        liveUrl: 'https://cloudsync-case-study.com',
        features: [
          'Multi-channel attribution modeling for accurate ROI tracking',
          'Automated email sequences with 45% open rates',
          'Landing page optimization increasing conversions by 120%',
          'Content marketing strategy generating 500+ qualified leads monthly',
          'Advanced segmentation and personalization strategies'
        ],
        results: [
          { value: '340%', metric: 'MRR Increase' },
          { value: '120%', metric: 'Conversion Rate' },
          { value: '500+', metric: 'Monthly Leads' }
        ]
      },
      {
        title: 'Real Estate Investment Dashboard',
        category: 'realestate',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
        description: 'AI-powered dashboard for real estate investment analysis',
        fullDescription: `Developed a comprehensive real estate investment analysis platform that combines market data, financial modeling, and predictive analytics to help investors make informed decisions. The platform analyzes over 100 data points per property and provides detailed investment recommendations.\n\nThe system integrates with multiple MLS databases, economic indicators, and demographic data sources to provide real-time market insights. Machine learning algorithms identify emerging market trends and investment opportunities with 87% accuracy.`,
        date: 'Nov 2023',
        views: 634,
        featured: false,
        technologies: ['Python', 'React', 'PostgreSQL', 'TensorFlow', 'D3.js'],
        duration: '4 months',
        client: 'Investment Properties LLC',
        liveUrl: 'https://realestate-dashboard.com',
        githubUrl: 'https://github.com/sarah/realestate-dashboard',
        features: [
          'Real-time property valuation using ML algorithms',
          'Market trend analysis and predictive modeling',
          'ROI calculations with multiple investment scenarios',
          'Interactive maps with neighborhood analytics',
          'Automated property alerts based on investment criteria'
        ],
        results: [
          { value: '87%', metric: 'Prediction Accuracy' },
          { value: '15%', metric: 'ROI Improvement' },
          { value: '200+', metric: 'Properties Analyzed' }
        ]
      }
    ],
    reviews: [
      {
        reviewer: {
          name: 'Michael Chen',
          title: 'CTO at TechStart Inc.',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        },
        rating: 5,
        date: '2024-02-15',
        project: 'E-commerce Platform Development',
        projectValue: '45,000',
        duration: '4 months',
        content: `Sarah exceeded all expectations on our e-commerce platform project. Her technical expertise combined with marketing insights resulted in a solution that not only functions flawlessly but also drives significant business growth. The platform she built increased our conversion rates by 85% and handles our growing traffic seamlessly.`,
        categories: {
          communication: 5,
          quality: 5,
          timeliness: 5,
          expertise: 5
        },
        helpful: 12,
        verified: true
      },
      {
        reviewer: {
          name: 'Lisa Rodriguez',
          title: 'Marketing Director at GrowthCorp',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
        },
        rating: 5,
        date: '2024-01-28',
        project: 'Digital Marketing Campaign',
        projectValue: '25,000',
        duration: '6 months',
        content: `Working with Sarah was transformative for our business. Her strategic approach to digital marketing combined with her technical background allowed her to implement solutions that our previous agencies couldn't deliver. We saw a 340% increase in MRR and significantly improved our customer acquisition costs.`,
        categories: {
          communication: 5,
          quality: 5,
          timeliness: 4,
          expertise: 5
        },
        helpful: 8,
        verified: true
      },
      {
        reviewer: {
          name: 'David Park',title: 'Real Estate Investor',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        },
        rating: 5,
        date: '2024-01-10',project: 'Investment Analysis Platform',projectValue: '35,000',duration: '3 months',content: `Sarah's real estate investment dashboard has revolutionized how I analyze properties. The AI-powered insights have helped me identify opportunities I would have missed otherwise, and the ROI predictions have been remarkably accurate. This tool has already paid for itself multiple times over.`,
        categories: {
          communication: 5,
          quality: 5,
          timeliness: 5,
          expertise: 5
        },
        helpful: 15,
        verified: true
      },
      {
        reviewer: {
          name: 'Amanda Foster',
          title: 'Startup Founder',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        },
        rating: 4,
        date: '2023-12-20',
        project: 'MVP Development & Marketing',
        projectValue: '30,000',
        duration: '5 months',
        content: `Sarah helped us build and launch our MVP while simultaneously setting up our marketing infrastructure. Her ability to work across both technical and marketing domains saved us significant time and resources. The product launched successfully and we've maintained steady growth since.`,
        categories: {
          communication: 4,
          quality: 5,
          timeliness: 4,
          expertise: 5
        },
        helpful: 6,
        verified: true
      }
    ],
    testimonials: [
      {
        content: `Sarah's unique combination of technical expertise and marketing acumen is rare in the industry. She doesn't just build products; she builds solutions that drive real business results. Her work on our platform directly contributed to a 200% increase in revenue.`,
        author: {
          name: 'Robert Kim',title: 'CEO, InnovateTech Solutions',avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
        }
      },
      {
        content: `Working with Sarah was one of the best decisions we made for our startup. Her strategic thinking and execution capabilities helped us scale from 0 to 10,000 users in just 6 months. She's not just a developer or marketer - she's a growth partner.`,
        author: {
          name: 'Jennifer Walsh',title: 'Founder, ScaleUp Ventures',avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
        }
      }
    ]
  };

  const tabs = [
    { id: 'about', name: 'About', icon: 'User', description: 'Personal info & highlights' },
    { id: 'skills', name: 'Skills', icon: 'Award', description: 'Expertise & certifications', badge: '12' },
    { id: 'experience', name: 'Experience', icon: 'Briefcase', description: 'Work history & education' },
    { id: 'portfolio', name: 'Portfolio', icon: 'Folder', description: 'Projects & case studies', badge: 'New' },
    { id: 'reviews', name: 'Reviews', icon: 'Star', description: 'Client feedback & ratings' }
  ];

  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab && tabs?.find(t => t?.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/professional-profile?tab=${tabId}`, { replace: true });
  };

  const handleEditProfile = () => {
    navigate('/professional-profile?tab=about&edit=true');
  };

  const handleConnectRequest = () => {
    // Handle connection request logic
    console.log('Connection request sent');
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection profile={profileData} isOwnProfile={isOwnProfile} />;
      case 'skills':
        return <SkillsSection profile={profileData} isOwnProfile={isOwnProfile} />;
      case 'experience':
        return <ExperienceSection profile={profileData} isOwnProfile={isOwnProfile} />;
      case 'portfolio':
        return <PortfolioSection profile={profileData} isOwnProfile={isOwnProfile} />;
      case 'reviews':
        return <ReviewsSection profile={profileData} isOwnProfile={isOwnProfile} />;
      default:
        return <AboutSection profile={profileData} isOwnProfile={isOwnProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container-professional section-spacing">
          {/* Profile Header */}
          <div className="mb-8">
            <ProfileHeader 
              profile={profileData}
              isOwnProfile={isOwnProfile}
              onEditProfile={handleEditProfile}
              onConnectRequest={handleConnectRequest}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <VerticalTabs 
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  tabs={tabs}
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalProfile;