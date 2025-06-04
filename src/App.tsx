
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
