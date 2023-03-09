import { render, screen, within } from '@testing-library/react';
import VirusSummary from "./VirusSummary";

jest.mock('next/router', () => require('next-router-mock'))

test('Basic content check', () => {
    const mockData = {
        virus: "TestVirus",
        description: "description for test virus",
        points: [],
    };

    render(<VirusSummary virus={mockData.virus} description={mockData.description} points={mockData.points} />)

    // Title
    const title = screen.getByTestId("ukhsa-title")
    expect(within(title).getByText("TestVirus")).toBeInTheDocument();
    expect(title).toHaveAttribute('href', '/viruses/TestVirus');

    // Download button
    const downloadButton = screen.getByTestId("ukhsa-downloadButton")
    expect(within(downloadButton).getByText("Download")).toBeInTheDocument();
    
    // Description
    const description = screen.getByTestId("ukhsa-description")
    expect(description).toBeInTheDocument();

    // Dropdown button
    const dropdown = screen.getByTestId("ukhsa-tabledropdown")
    expect(within(dropdown).getByText("View data in a tabular format")).toBeInTheDocument();
})