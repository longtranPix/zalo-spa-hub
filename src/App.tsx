
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ZaloProvider } from "./contexts/ZaloContext";
import Index from "./pages/Index";
import CategoryList from "./components/categories/CategoryList";
import CategoryServices from "./components/services/CategoryServices";
import ServiceDetail from "./components/services/ServiceDetail";
import Profile from "./pages/Profile";
import Bookings from "./components/booking/Bookings";
import UserBills from "./components/bill/UserBills";
import BillDetail from "./components/bill/BillDetail";
import StoreList from "./components/store/StoreList";
import StoreDetail from "./components/store/StoreDetail";
import NewsList from "./components/news/NewsList";
import NewsDetail from "./components/news/NewsDetail";
import BookingForm from "./components/booking/BookingForm";
import NotFound from "./pages/NotFound";
import { App, ZMPRouter } from "zmp-ui";
import { Layout } from "./components/layout";

const queryClient = new QueryClient();

const MyApp = () => (
  <QueryClientProvider client={queryClient}>
    <ZaloProvider>
      <TooltipProvider>
        <App>
          <Toaster />
          <Sonner />
      {/* <BrowserRouter> */}
          <ZMPRouter>
            <Layout />
          </ZMPRouter>
      {/* </BrowserRouter> */}
        </App>
      </TooltipProvider>
    </ZaloProvider>
  </QueryClientProvider>
);

export default MyApp;
