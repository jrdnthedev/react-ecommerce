import { render, screen } from '@testing-library/react';
import { Badge } from './badge';



describe('Badge', () => {

    it('renders badge', () => {
        render(<Badge quantity={1} />);
        const badgeElement = screen.getByTestId('badge-id');
        expect(badgeElement).toBeInTheDocument();
    });

    it('renders badge with quantity', () => {
        render(<Badge quantity={4.2} />);
        const badgeElement = screen.getByTestId('badge-id');
        expect(badgeElement).toHaveTextContent('4.2');
    });
});