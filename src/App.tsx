import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MyArticles from "./pages/MyArticles";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import AmazonReviewGenerator from "./pages/AmazonReviewGenerator";
import BuyingGuideGenerator from "./pages/BuyingGuideGenerator";
import ProductRoundupGenerator from "./pages/ProductRoundupGenerator";
import HowToArticleGenerator from "./pages/HowToArticleGenerator";
import ProductComparisonGenerator from "./pages/ProductComparisonGenerator";
import Auth from "./pages/Auth";
import AmazonReviewsPage from "./pages/article-types/AmazonReviews";
import ProductComparisonsPage from "./pages/article-types/ProductComparisons";
import BuyingGuidesPage from "./pages/article-types/BuyingGuides";
import HowToArticlesPage from "./pages/article-types/HowToArticles";
import ProductRoundupsPage from "./pages/article-types/ProductRoundups";
import AboutPage from "./pages/About";
import PricingPage from "./pages/Pricing";
import ContactPage from "./pages/Contact";
import PrivacyPage from "./pages/legal/Privacy";
import TermsPage from "./pages/legal/Terms";
import CookiesPage from "./pages/legal/Cookies";
import DisclaimerPage from "./pages/legal/Disclaimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/articles" element={<ProtectedRoute><MyArticles /></ProtectedRoute>} />
            <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/dashboard/create/amazon-review" element={<ProtectedRoute><AmazonReviewGenerator /></ProtectedRoute>} />
            <Route path="/dashboard/create/buying-guide" element={<ProtectedRoute><BuyingGuideGenerator /></ProtectedRoute>} />
            <Route path="/dashboard/create/product-roundup" element={<ProtectedRoute><ProductRoundupGenerator /></ProtectedRoute>} />
            <Route path="/dashboard/create/how-to-article" element={<ProtectedRoute><HowToArticleGenerator /></ProtectedRoute>} />
            <Route path="/dashboard/create/product-comparison" element={<ProtectedRoute><ProductComparisonGenerator /></ProtectedRoute>} />
          
          {/* Article Type Sales Pages */}
          <Route path="/amazon-product-review-generator" element={<AmazonReviewsPage />} />
          <Route path="/product-comparison-generator" element={<ProductComparisonsPage />} />
          <Route path="/buying-guide-generator" element={<BuyingGuidesPage />} />
          <Route path="/how-to-article-generator" element={<HowToArticlesPage />} />
          <Route path="/product-roundup-generator" element={<ProductRoundupsPage />} />
          
          {/* Static Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Legal Pages */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
