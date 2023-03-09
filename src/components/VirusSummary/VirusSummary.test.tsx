import { render, screen, within } from '@testing-library/react';
import VirusSummary from "./VirusSummary";

jest.mock('next/router', () => require('next-router-mock'))

test('Displays the title, description, shows a download button, and table dropdown button ', () => {
    const mockData = {
        virus: "TestVirus",
        description: "description for test virus",
        points: [],
    };

    render(<VirusSummary virus={mockData.virus} description={mockData.description} points={mockData.points} />)

    // Title
    const title = screen.getByText("TestVirus")
    expect(title).toBeInTheDocument()
    expect(title).toHaveAttribute('href', '/viruses/TestVirus')

    // Download button
    expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument()
    
    // Description
    expect(screen.getByText("description for test virus")).toBeInTheDocument()

    // Dropdown button
    expect(screen.getByText("View data in a tabular format")).toBeInTheDocument()
})