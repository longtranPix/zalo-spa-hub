import React, { useState } from 'react';
import { useNavigate } from 'zmp-ui';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RatingScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get URL parameters manually since we're using ZMP
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type') || 'service';
  const id = urlParams.get('id') || '1';
  const name = urlParams.get('name') || 'Unknown';
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data based on type
  const getRatingData = () => {
    switch (type) {
      case 'employee':
        return {
          title: 'Rate Hair Stylist',
          subtitle: 'How was your experience with',
          image: '/placeholder.svg',
          placeholder: 'Share your experience with this stylist...'
        };
      case 'salon':
        return {
          title: 'Rate Salon',
          subtitle: 'How was your overall salon experience',
          image: '/placeholder.svg',
          placeholder: 'Tell us about your salon experience...'
        };
      default:
        return {
          title: 'Rate Service',
          subtitle: 'How was your',
          image: '/placeholder.svg',
          placeholder: 'How was the service quality...'
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

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Rating Submitted",
        description: "Thank you for your feedback!",
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

  return (
    <PageLayout title={ratingData.title} showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* Subject Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={ratingData.image} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">{ratingData.subtitle}</p>
                <h3 className="text-lg font-semibold">{name}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Your Rating</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                <span>Excellent service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">4 stars:</span>
                <span>Good service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">3 stars:</span>
                <span>Fair service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">2 stars:</span>
                <span>Poor service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">1 star:</span>
                <span>Terrible service</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default RatingScreen;
