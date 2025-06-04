
import BillDetail from "@/pages/BillDetail";
import BookingForm from "@/pages/BookingForm";
import Bookings from "@/pages/Bookings";
import CategoryList from "@/pages/CategoryList";
import CategoryServices from "@/pages/CategoryServices";
import Index from "@/pages/Index";
import NewsDetail from "@/pages/NewsDetail";
import NewsList from "@/pages/NewsList";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import RatingScreen from "@/pages/RatingScreen";
import ServiceDetail from "@/pages/ServiceDetail";
import StoreDetail from "@/pages/StoreDetail";
import StoreList from "@/pages/StoreList";
import UserBills from "@/pages/UserBills";
import { FC } from "react";
import { Route, Routes, ScrollRestoration } from "react-router-dom";
import { Box } from "zmp-ui";

export const Layout: FC = () => {

    return (
        <Box flex flexDirection="column" className="h-screen">
            {/* <ScrollRestoration /> */}
            <Box className="flex-1 flex flex-col overflow-hidden">
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
                    <Route path="/rating" element={<RatingScreen />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
        </Box>
    );
};
