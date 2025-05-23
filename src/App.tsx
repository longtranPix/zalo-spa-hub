
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ZaloProvider } from "./contexts/ZaloContext";
import Index from "./pages/Index";
import CategoryList from "./pages/CategoryList";
import ServiceDetail from "./pages/ServiceDetail";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import UserBills from "./pages/UserBills";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ZaloProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bills" element={<UserBills />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ZaloProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
