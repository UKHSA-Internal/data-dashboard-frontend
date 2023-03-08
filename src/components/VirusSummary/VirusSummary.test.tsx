import { render, screen, within } from '@testing-library/react';
import VirusSummary from "./VirusSummary";

jest.mock('next/router', () => require('next-router-mock'))

test('Name', () => {
    const mockData = {
        virus: "Test virus",
        description: "description for test virus",
        points: [],
    };

    // render(<VirusSummary virus={mockData.virus} descrpition={mockData.description} points={mockData.points} />)

    // // // Title
    // const title = screen.getByTestId("ukhsa-title")
    // expect(within(title).getByText("Test virus")).toBeInTheDocument();

    // // // Download button
    // const downloadButton = screen.getByTestId("ukhsa-downloadButton")
    // expect(within(downloadButton).getByText("Download")).toBeInTheDocument();
    
    // // // Description
    // const description = screen.getByTestId("ukhsa-description")
    // expect(within(description).getByText("description for test virus")).toBeInTheDocument();

    
    // On click dropdown, see if items exist

    // matches snapshot
})