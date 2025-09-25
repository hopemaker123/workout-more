
import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProfessionalProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    title: "Full-Stack Developer & Digital Marketing Strategist",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    connections: 1247,
    rating: 4.9,
    reviews: 156,
    about: `Passionate full-stack developer and digital marketing strategist with 8+ years of experience building scalable web applications and driving growth through data-driven marketing campaigns. Specialized in React, Node.js, and modern marketing automation tools.`,
    skills: ['React.js', 'Node.js', 'Digital Marketing', 'SEO/SEM', 'Project Management', 'UI/UX Design'],
    experience: [
      {
        position: 'Senior Full-Stack Developer',
        company: 'TechFlow Solutions',
        duration: 'Jan 2022 - Present'
      },
      {
        position: 'Digital Marketing Consultant',
        company: 'Growth Partners Agency',
        duration: 'Mar 2021 - Dec 2023'
      },
    ],
    education: [
        {
            degree: 'Master of Science in Computer Science',
            institution: 'Stanford University',
            year: '2018'
        },
    ],
    portfolio: [
        {
            title: 'E-commerce Platform Redesign',
            category: 'web',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
        },
    ],
    reviews: [
      {
        reviewer: 'Michael Chen',
        rating: 5,
        content: `Sarah exceeded all expectations on our e-commerce platform project. Her technical expertise combined with marketing insights resulted in a solution that not only functions flawlessly but also drives significant business growth.`,
      },
    ]
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-16">
          <div className="container-professional text-center">
            <img src={profileData.avatar} alt={profileData.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"/>
            <h1 className="text-4xl font-bold mb-2">{profileData.name}</h1>
            <p className="text-xl opacity-90">{profileData.title}</p>
            <p className="text-md opacity-80">{profileData.location}</p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>{profileData.connections} Connections</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} />
                <span>{profileData.rating} ({profileData.reviews} Reviews)</span>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="secondary" size="lg">Edit Profile</Button>
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-professional grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="card-professional">
                <h2 className="text-2xl font-bold mb-4">About Me</h2>
                <p>{profileData.about}</p>
              </div>

              {/* Experience Section */}
              <div className="card-professional">
                <h2 className="text-2xl font-bold mb-4">Experience</h2>
                <ul className="space-y-4">
                  {profileData.experience.map((exp, index) => (
                    <li key={index}>
                      <p className="font-bold">{exp.position}</p>
                      <p className="text-text-secondary">{exp.company} - {exp.duration}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education Section */}
              <div className="card-professional">
                <h2 className="text-2xl font-bold mb-4">Education</h2>
                <ul className="space-y-4">
                  {profileData.education.map((edu, index) => (
                    <li key={index}>
                      <p className="font-bold">{edu.degree}</p>
                      <p className="text-text-secondary">{edu.institution} - {edu.year}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Portfolio Section */}
              <div className="card-professional">
                  <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.portfolio.map((item, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover"/>
                        <div className="p-4 bg-muted">
                            <p className="font-bold">{item.title}</p>
                            <p className="text-text-secondary">{item.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>

              {/* Reviews Section */}
              <div className="card-professional">
                  <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                  <ul className="space-y-4">
                      {profileData.reviews.map((review, index) => (
                          <li key={index} className="border-b pb-4">
                              <div className="flex items-center mb-2">
                                  <p className="font-bold mr-2">{review.reviewer}</p>
                                  <div className="flex items-center">
                                      {[...Array(review.rating)].map((_, i) => <Icon key={i} name="Star" size={16} className="text-yellow-500"/>)}
                                  </div>
                              </div>
                              <p className="text-text-secondary">{review.content}</p>
                          </li>
                      ))}
                  </ul>
              </div>
            </div>

            {/* Skills Section */}
            <div className="lg:col-span-1 space-y-8">
              <div className="card-professional">
                <h2 className="text-2xl font-bold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfessionalProfile;
