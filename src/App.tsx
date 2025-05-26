
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ZaloProvider } from "./contexts/ZaloContext";
import Index from "./pages/Index";
import CategoryList from "./pages/CategoryList";
import CategoryServices from "./pages/CategoryServices";
import ServiceDetail from "./pages/ServiceDetail";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import UserBills from "./pages/UserBills";
import BillDetail from "./pages/BillDetail";
import StoreList from "./pages/StoreList";
import StoreDetail from "./pages/StoreDetail";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import BookingForm from "./pages/BookingForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ZaloProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/:categoryId" element={<CategoryServices />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/bills" element={<UserBills />} />
            <Route path="/bills/:id" element={<BillDetail />} />
            <Route path="/stores" element={<StoreList />} />
            <Route path="/stores/:id" element={<StoreDetail />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ZaloProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
