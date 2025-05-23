
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useZalo } from '@/contexts/ZaloContext';

// Mock bookings data
const upcomingBookings = [
  {
    id: 'b1',
    serviceName: 'Deep Tissue Massage',
    date: '2025-05-26',
    time: '14:00',
    therapist: 'Emma Thompson',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'b2',
    serviceName: 'Aromatherapy Facial',
    date: '2025-06-03',
    time: '10:30',
    therapist: 'Sarah Wilson',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const pastBookings = [
  {
    id: 'b3',
    serviceName: 'Swedish Massage',
    date: '2025-05-10',
    time: '15:00',
    therapist: 'Michael Chen',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'b4',
    serviceName: 'Hot Stone Therapy',
    date: '2025-04-22',
    time: '11:00',
    therapist: 'Daniel Lopez',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { showConfirm, showToast } = useZalo();

  const handleCancelBooking = async (bookingId: string) => {
    const confirmed = await showConfirm('Are you sure you want to cancel this booking?');
    if (confirmed) {
      // In a real app, this would call an API to cancel the booking
      showToast('Booking cancelled successfully');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-zalo-green">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <PageLayout title="My Bookings">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No upcoming bookings</p>
              <Button className="mt-4" asChild>
                <a href="/">Book a Service</a>
              </Button>
            </div>
          ) : (
            upcomingBookings.map((booking) => (
              <Card key={booking.id} className="animate-slide-up">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img 
                      src={booking.image} 
                      alt={booking.serviceName} 
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-semibold">{booking.serviceName}</h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Therapist: {booking.therapist}
                      </p>
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1 text-zalo-blue">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        <span>{formatDate(booking.date)} • {booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm">
                      Reschedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No past bookings</p>
            </div>
          ) : (
            pastBookings.map((booking) => (
              <Card key={booking.id} className="animate-slide-up">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img 
                      src={booking.image} 
                      alt={booking.serviceName} 
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-semibold">{booking.serviceName}</h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Therapist: {booking.therapist}
                      </p>
                      <div className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1 text-zalo-blue">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        <span>{formatDate(booking.date)} • {booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      Book Again
                    </Button>
                    <Button size="sm" variant="secondary">
                      Rate Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Bookings;
