
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, User, Scissors } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const getRatingText = (rating: number) => {
    if (rating === 0) return '';
    const texts = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent'];
    return texts[rating - 1];
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Select Employee</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an employee to rate" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={employee.image} alt={employee.name} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.specialty}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Service Selection */}
        {type === 'service' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scissors className="w-5 h-5" />
                <span>Select Service</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service to rate" />
                </SelectTrigger>
                <SelectContent>
                  {mockServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground">{service.category}</div>
                        </div>
                        <div className="text-sm font-medium">
                          {formatPrice(service.price)}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Rating Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Your Rating</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-sm text-muted-foreground">
              {ratingData.subtitle}
            </div>

            {/* Star Rating */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 transition-transform hover:scale-110"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              {(rating > 0 || hoverRating > 0) && (
                <p className="text-sm font-medium text-violet-600">
                  {getRatingText(hoverRating || rating)}
                </p>
              )}
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <Label htmlFor="comment">Additional Comments (Optional)</Label>
              <Textarea
                id="comment"
                placeholder={ratingData.placeholder}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
              className="w-full bg-violet-500 hover:bg-violet-600"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </CardContent>
        </Card>

        {/* Rating Guidelines */}
        <Card className="bg-violet-50">
          <CardContent className="p-4">
            <h4 className="font-medium text-violet-800 mb-2">Rating Guidelines</h4>
            <div className="space-y-1 text-sm text-violet-700">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">5 stars:</span>
                <span>Excellent experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">4 stars:</span>
                <span>Good experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">3 stars:</span>
                <span>Fair experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">2 stars:</span>
                <span>Poor experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">1 star:</span>
                <span>Terrible experience</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default RatingScreen;
