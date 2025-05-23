
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useZalo } from '@/contexts/ZaloContext';

// Mock service data
const services = [
  {
    id: '1',
    name: 'Deep Tissue Massage',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 79,
    duration: '60 min',
    category: 'Massage',
    rating: 4.8,
    featured: true,
    description: 'Deep tissue massage focuses on realigning deeper layers of muscles and connective tissue. It is especially helpful for chronic aches and pains in areas such as a stiff neck, lower back, and sore shoulders.',
    benefits: [
      'Relieves chronic pain and tension',
      'Improves blood circulation',
      'Reduces inflammation',
      'Breaks up scar tissue',
      'Improves mobility and flexibility'
    ],
    therapists: [
      { name: 'Emma Thompson', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { name: 'Michael Chen', image: 'https://randomuser.me/api/portraits/men/32.jpg' }
    ]
  },
  {
    id: '2',
    name: 'Aromatherapy Facial',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    price: 89,
    duration: '45 min',
    category: 'Facial',
    rating: 4.7,
    featured: true,
    description: 'Our aromatherapy facial uses essential oils to address specific skin concerns while providing deep relaxation. The treatment includes cleansing, exfoliation, extraction, massage, and hydration for radiant skin.',
    benefits: [
      'Reduces stress and promotes relaxation',
      'Improves skin texture and tone',
      'Cleanses and detoxifies',
      'Balances oil production',
      'Provides deep hydration'
    ],
    therapists: [
      { name: 'Sarah Wilson', image: 'https://randomuser.me/api/portraits/women/67.jpg' },
      { name: 'Daniel Lopez', image: 'https://randomuser.me/api/portraits/men/75.jpg' }
    ]
  },
];

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast, showConfirm } = useZalo();
  const [activeTab, setActiveTab] = useState('details');

  // Find the service by ID
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <PageLayout title="Not Found" showBackButton>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-4">Service not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </PageLayout>
    );
  }

  const handleBooking = async () => {
    const confirmed = await showConfirm(`Book ${service.name} for $${service.price}?`);
    if (confirmed) {
      showToast('Booking successful!');
      navigate('/bookings');
    }
  };

  return (
    <PageLayout 
      title={service.name} 
      showBackButton
      hideBottomNav
      rightElement={
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => showToast('Added to favorites!')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </Button>
      }
    >
      <div className="animate-fade-in">
        {/* Service Image */}
        <div className="-mx-4 -mt-4 mb-4">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-16 right-4">
            {service.featured && (
              <Badge className="bg-zalo-blue">
                Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Service Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{service.name}</h1>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFB400" className="w-5 h-5 mr-1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="font-semibold">{service.rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground">{service.category}</p>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground mr-1">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-muted-foreground">{service.duration}</span>
            </div>
            <div className="text-xl font-bold text-zalo-blue">
              ${service.price}
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />

        {/* Service Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="therapists">Therapists</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="animate-fade-in">
            <p className="text-muted-foreground">{service.description}</p>
          </TabsContent>
          <TabsContent value="benefits" className="animate-fade-in">
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-zalo-green mr-2 mt-0.5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="therapists" className="animate-fade-in">
            <div className="space-y-3">
              {service.therapists.map((therapist, index) => (
                <Card key={index}>
                  <CardContent className="p-3 flex items-center">
                    <img 
                      src={therapist.image} 
                      alt={therapist.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{therapist.name}</h3>
                      <p className="text-sm text-muted-foreground">Certified Therapist</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Booking Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <Button 
            className="w-full bg-zalo-blue hover:bg-blue-600 text-white py-6"
            onClick={handleBooking}
          >
            Book Now
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServiceDetail;
