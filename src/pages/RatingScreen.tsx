
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import EmployeeSelector from '@/components/rating/EmployeeSelector';
import ServiceSelector from '@/components/rating/ServiceSelector';
import RatingForm from '@/components/rating/RatingForm';

const RatingScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const type = searchParams.get('type') || 'store';
  const storeId = searchParams.get('storeId') || '1';
  const storeName = searchParams.get('storeName') || 'Beauty Salon';
  
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for employees and services
  const mockEmployees = [
    { id: '1', name: 'Sarah Johnson', specialty: 'Hair Stylist', image: '/placeholder.svg' },
    { id: '2', name: 'Maria Garcia', specialty: 'Nail Technician', image: '/placeholder.svg' },
    { id: '3', name: 'Emily Chen', specialty: 'Massage Therapist', image: '/placeholder.svg' },
    { id: '4', name: 'Jessica Kim', specialty: 'Esthetician', image: '/placeholder.svg' }
  ];

  const mockServices = [
    { id: '1', name: 'Hair Cut & Style', category: 'Hair', price: 450000 },
    { id: '2', name: 'Manicure & Pedicure', category: 'Nails', price: 300000 },
    { id: '3', name: 'Deep Tissue Massage', category: 'Massage', price: 600000 },
    { id: '4', name: 'Facial Treatment', category: 'Skincare', price: 500000 }
  ];

  const getRatingData = () => {
    switch (type) {
      case 'employee':
        return {
          title: 'Rate Employee',
          subtitle: 'How was your experience with the staff member?',
          placeholder: 'Share your experience with the employee...'
        };
      case 'service':
        return {
          title: 'Rate Service',
          subtitle: 'How was the service quality?',
          placeholder: 'Tell us about the service you received...'
        };
      default:
        return {
          title: 'Rate Store',
          subtitle: 'How was your overall experience?',
          placeholder: 'Share your overall salon experience...'
        };
    }
  };

  const ratingData = getRatingData();

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (type === 'employee' && !selectedEmployee) {
      toast({
        title: "Employee Required",
        description: "Please select an employee to rate.",
        variant: "destructive"
      });
      return;
    }

    if (type === 'service' && !selectedService) {
      toast({
        title: "Service Required",
        description: "Please select a service to rate.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const selectedEmployeeName = mockEmployees.find(emp => emp.id === selectedEmployee)?.name;
      const selectedServiceName = mockServices.find(svc => svc.id === selectedService)?.name;
      
      let successMessage = "Thank you for your feedback!";
      
      if (type === 'employee' && selectedEmployeeName) {
        successMessage = `Thank you for rating ${selectedEmployeeName}!`;
      } else if (type === 'service' && selectedServiceName) {
        successMessage = `Thank you for rating ${selectedServiceName}!`;
      } else if (type === 'store') {
        successMessage = `Thank you for rating ${storeName}!`;
      }

      toast({
        title: "Rating Submitted",
        description: successMessage,
        variant: "default"
      });
      
      setIsSubmitting(false);
      navigate(-1);
    }, 1000);
  };

  return (
    <PageLayout title={ratingData.title} showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* Store Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" alt={storeName} />
                <AvatarFallback>{storeName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Rating for</p>
                <h3 className="text-lg font-semibold">{storeName}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Selection */}
        {type === 'employee' && (
          <EmployeeSelector
            selectedEmployee={selectedEmployee}
            onEmployeeChange={setSelectedEmployee}
            employees={mockEmployees}
          />
        )}

        {/* Service Selection */}
        {type === 'service' && (
          <ServiceSelector
            selectedService={selectedService}
            onServiceChange={setSelectedService}
            services={mockServices}
          />
        )}

        {/* Rating Form */}
        <RatingForm
          rating={rating}
          hoverRating={hoverRating}
          comment={comment}
          isSubmitting={isSubmitting}
          ratingData={ratingData}
          onStarClick={handleStarClick}
          onStarHover={handleStarHover}
          onStarLeave={handleStarLeave}
          onCommentChange={setComment}
          onSubmit={handleSubmit}
        />
      </div>
    </PageLayout>
  );
};

export default RatingScreen;
