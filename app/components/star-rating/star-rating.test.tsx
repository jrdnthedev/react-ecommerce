import { render, screen } from '@testing-library/react';
import { StarRating } from './star-rating';

describe('StarRating', () => {

    it('should render 5 stars', () => {
        render(<StarRating rating={5} />);
        const stars = screen.getAllByTestId('full-star');
        expect(stars).toHaveLength(5);
    })

    it('should render 5 empty stars', () => {
        render(<StarRating rating={0} />);
        const stars = screen.getAllByTestId('empty-star');
        expect(stars).toHaveLength(5);
    })

    it('should render 3 full stars and 1 partial star and 1 empty star', () => {
        render(<StarRating rating={3.5} />);
        const fullStars = screen.getAllByTestId('full-star');
        const partialStar = screen.getByTestId('partial-star');
        const emptyStars = screen.getAllByTestId('empty-star');
        expect(fullStars).toHaveLength(3);
        expect(partialStar).toBeInTheDocument();
        expect(emptyStars).toHaveLength(1);
    })

    it('should render rating badge', () => {
        render(<StarRating rating={5} />);
        const badge = screen.getByTestId('rating-badge');
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveTextContent('5');
    })

});