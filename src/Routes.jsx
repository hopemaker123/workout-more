
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ProfessionalProfile from './pages/professional-profile';
import ResourceLibrary from './pages/resource-library';
import OpportunityExplorer from './pages/opportunity-explorer';
import Dashboard from './pages/dashboard';
import ServicesMarketplace from './pages/services-marketplace';
import Homepage from './pages/homepage';
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import RealEstate from "./pages/real-estate";
import Marketing from "./pages/marketing";
import JobPlacement from "./pages/job-placement";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/professional-profile" element={<ProfessionalProfile />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/opportunity-explorer" element={<OpportunityExplorer />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/services-marketplace" element={<ServicesMarketplace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/real-estate" element={<RealEstate />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/job-placement" element={<JobPlacement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
