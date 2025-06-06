
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';

interface RatingFormProps {
  rating: number;
  hoverRating: number;
  comment: string;
  isSubmitting: boolean;
  ratingData: {
    subtitle: string;
    placeholder: string;
  };
  onStarClick: (value: number) => void;
  onStarHover: (value: number) => void;
  onStarLeave: () => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
}

const RatingForm: React.FC<RatingFormProps> = ({
  rating,
  hoverRating,
  comment,
  isSubmitting,
  ratingData,
  onStarClick,
  onStarHover,
  onStarLeave,
  onCommentChange,
  onSubmit
}) => {
  const getRatingText = (rating: number) => {
    if (rating === 0) return '';
    const texts = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent'];
    return texts[rating - 1];
  };

  return (
    <>
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
                  onClick={() => onStarClick(star)}
                  onMouseEnter={() => onStarHover(star)}
                  onMouseLeave={onStarLeave}
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
              onChange={(e) => onCommentChange(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={onSubmit}
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
    </>
  );
};

export default RatingForm;
