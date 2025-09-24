import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Opportunity Explorer', path: '/opportunity-explorer' },
        { name: 'Professional Profile', path: '/professional-profile' },
        { name: 'Services Marketplace', path: '/services-marketplace' },
        { name: 'Resource Library', path: '/resource-library' }
      ]
    },
    {
      title: 'Verticals',
      links: [
        { name: 'Job Marketplace', path: '/opportunity-explorer?type=jobs' },
        { name: 'Marketing Services', path: '/services-marketplace?vertical=marketing' },
        { name: 'Real Estate Platform', path: '/services-marketplace?vertical=real-estate' },
        { name: 'Cross-Vertical Opportunities', path: '/opportunity-explorer?type=cross-vertical' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'API Documentation', path: '/api-docs' },
        { name: 'Success Stories', path: '/success-stories' },
        { name: 'Blog & Insights', path: '/blog' },
        { name: 'Webinars & Events', path: '/events' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About WorkHub Pro', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press & Media', path: '/press' },
        { name: 'Partner Program', path: '/partners' },
        { name: 'Contact Us', path: '/contact' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/workhub-pro' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/workhubpro' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/workhubpro' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/workhubpro' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/workhubpro' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'GDPR Compliance', path: '/gdpr' },
    { name: 'Accessibility', path: '/accessibility' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="container-professional py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-professional">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">WorkHub Pro</h3>
                <p className="text-sm text-text-secondary">Professional Convergence</p>
              </div>
            </div>
            
            <p className="text-text-secondary leading-relaxed mb-6">
              Where careers, businesses, and investments intersect. WorkHub Pro breaks traditional silos to serve modern professionals who operate across multiple domains.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold text-primary mb-3">Stay Connected</h4>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Send"
                  iconPosition="right"
                >
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-primary mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks?.map((social) => (
                  <button
                    key={social?.name}
                    onClick={() => handleExternalLink(social?.url)}
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-base flex items-center justify-center focus-professional"
                    title={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title}>
              <h4 className="font-semibold text-primary mb-4">{section?.title}</h4>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    <button
                      onClick={() => handleNavigation(link?.path)}
                      className="text-text-secondary hover:text-primary transition-colors duration-base text-sm"
                    >
                      {link?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Trust & Security Section */}
      <div className="border-t border-border bg-muted/30">
        <div className="container-professional py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-primary mb-3">Security & Trust</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-text-secondary">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-success" />
                  <span className="text-sm text-text-secondary">GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-accent" />
                  <span className="text-sm text-text-secondary">SOC 2 Certified</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h4 className="font-semibold text-primary mb-3">Platform Stats</h4>
              <div className="flex justify-center space-x-6">
                <div>
                  <div className="text-lg font-bold text-secondary">500K+</div>
                  <div className="text-xs text-text-secondary">Active Users</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-accent">$2.4B</div>
                  <div className="text-xs text-text-secondary">Transactions</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-success">99.9%</div>
                  <div className="text-xs text-text-secondary">Uptime</div>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-semibold text-primary mb-3">Support</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm text-text-secondary">24/7 Support</span>
                </div>
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <Icon name="MessageCircle" size={16} className="text-primary" />
                  <span className="text-sm text-text-secondary">Live Chat Available</span>
                </div>
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-sm text-text-secondary">1-800-WORKHUB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-border bg-background">
        <div className="container-professional py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-text-secondary">
              © {currentYear} WorkHub Pro. All rights reserved. Empowering professional convergence worldwide.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center space-x-6">
              {legalLinks?.map((link, index) => (
                <React.Fragment key={link?.name}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-base"
                  >
                    {link?.name}
                  </button>
                  {index < legalLinks?.length - 1 && (
                    <span className="text-text-secondary">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Language & Region */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">English (US)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;