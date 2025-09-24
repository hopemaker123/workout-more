import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProfessionalProfile from './pages/professional-profile';
import ResourceLibrary from './pages/resource-library';
import OpportunityExplorer from './pages/opportunity-explorer';
import Dashboard from './pages/dashboard';
import ServicesMarketplace from './pages/services-marketplace';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/professional-profile" element={<ProfessionalProfile />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/opportunity-explorer" element={<OpportunityExplorer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services-marketplace" element={<ServicesMarketplace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
