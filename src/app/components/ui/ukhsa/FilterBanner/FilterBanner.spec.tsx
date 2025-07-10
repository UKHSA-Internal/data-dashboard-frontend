import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBanner } from './FilterBanner';

describe('FilterBanner', () => {
    const defaultProps = {
        filters: [
            { label: 'Status', value: 'Active', onRemove: jest.fn() },
            { label: 'Type', value: 'Internal', onRemove: jest.fn() },
        ],
        onClearAll: jest.fn(),
    };

    it('renders all filters', () => {
        render(<FilterBanner message={''} {...defaultProps} />);
        expect(screen.getByText('Status:')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Type:')).toBeInTheDocument();
        expect(screen.getByText('Internal')).toBeInTheDocument();
    });

    it('calls onRemove when a filter remove button is clicked', () => {
        render(<FilterBanner message={''} {...defaultProps} />);
        const removeButtons = screen.getAllByLabelText(/Remove filter/i);
        fireEvent.click(removeButtons[0]);
        expect(defaultProps.filters[0].onRemove).toHaveBeenCalled();
    });

    it('calls onClearAll when Clear All is clicked', () => {
        render(<FilterBanner message={''} {...defaultProps} />);
        const clearAllButton = screen.getByRole('button', { name: /Clear All/i });
        fireEvent.click(clearAllButton);
        expect(defaultProps.onClearAll).toHaveBeenCalled();
    });

    it('does not render if there are no filters', () => {
        const { container } = render(<FilterBanner message={''}/>);
        expect(container).toBeEmptyDOMElement();
    });
});