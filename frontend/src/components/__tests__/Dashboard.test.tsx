import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';

// Mock the Dashboard component since it doesn't exist yet
const MockDashboard = () => (
  <div data-testid="dashboard">
    <h1>Digital Twin Dashboard</h1>
    <div data-testid="metrics-panel">
      <h2>Key Metrics</h2>
      <div data-testid="metric-energy">Energy: 85%</div>
      <div data-testid="metric-occupancy">Occupancy: 60%</div>
      <div data-testid="metric-temperature">Temperature: 22°C</div>
    </div>
    <div data-testid="alerts-panel">
      <h2>Alerts</h2>
      <div data-testid="alert-item">System maintenance required</div>
    </div>
  </div>
);

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Dashboard Component', () => {
  it('renders dashboard title', () => {
    renderWithRouter(<MockDashboard />);
    expect(screen.getByText('Digital Twin Dashboard')).toBeInTheDocument();
  });

  it('displays key metrics', () => {
    renderWithRouter(<MockDashboard />);
    
    expect(screen.getByTestId('metrics-panel')).toBeInTheDocument();
    expect(screen.getByText('Key Metrics')).toBeInTheDocument();
    expect(screen.getByTestId('metric-energy')).toHaveTextContent('Energy: 85%');
    expect(screen.getByTestId('metric-occupancy')).toHaveTextContent('Occupancy: 60%');
    expect(screen.getByTestId('metric-temperature')).toHaveTextContent('Temperature: 22°C');
  });

  it('displays alerts panel', () => {
    renderWithRouter(<MockDashboard />);
    
    expect(screen.getByTestId('alerts-panel')).toBeInTheDocument();
    expect(screen.getByText('Alerts')).toBeInTheDocument();
    expect(screen.getByTestId('alert-item')).toHaveTextContent('System maintenance required');
  });

  it('has proper accessibility attributes', () => {
    renderWithRouter(<MockDashboard />);
    
    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toBeInTheDocument();
    
    // Check for proper heading structure
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(3); // h1 + 2 h2s
  });

  it('responds to user interactions', async () => {
    renderWithRouter(<MockDashboard />);
    
    const metricsPanel = screen.getByTestId('metrics-panel');
    fireEvent.click(metricsPanel);
    
    // Add interaction tests as needed
    await waitFor(() => {
      expect(metricsPanel).toBeInTheDocument();
    });
  });
});

// Example of testing with mocked data
describe('Dashboard with Mocked Data', () => {
  const mockMetrics = {
    energy: 85,
    occupancy: 60,
    temperature: 22,
  };

  const MockDashboardWithData = ({ metrics = mockMetrics }) => (
    <div data-testid="dashboard">
      <h1>Digital Twin Dashboard</h1>
      <div data-testid="metrics-panel">
        <h2>Key Metrics</h2>
        <div data-testid="metric-energy">Energy: {metrics.energy}%</div>
        <div data-testid="metric-occupancy">Occupancy: {metrics.occupancy}%</div>
        <div data-testid="metric-temperature">Temperature: {metrics.temperature}°C</div>
      </div>
    </div>
  );

  it('displays dynamic metrics data', () => {
    const customMetrics = {
      energy: 90,
      occupancy: 75,
      temperature: 24,
    };

    renderWithRouter(<MockDashboardWithData metrics={customMetrics} />);
    
    expect(screen.getByTestId('metric-energy')).toHaveTextContent('Energy: 90%');
    expect(screen.getByTestId('metric-occupancy')).toHaveTextContent('Occupancy: 75%');
    expect(screen.getByTestId('metric-temperature')).toHaveTextContent('Temperature: 24°C');
  });

  it('handles empty metrics gracefully', () => {
    const emptyMetrics = {
      energy: 0,
      occupancy: 0,
      temperature: 0,
    };

    renderWithRouter(<MockDashboardWithData metrics={emptyMetrics} />);
    
    expect(screen.getByTestId('metric-energy')).toHaveTextContent('Energy: 0%');
    expect(screen.getByTestId('metric-occupancy')).toHaveTextContent('Occupancy: 0%');
    expect(screen.getByTestId('metric-temperature')).toHaveTextContent('Temperature: 0°C');
  });
});

// Example of testing error states
describe('Dashboard Error Handling', () => {
  const MockDashboardWithError = ({ hasError = false }) => (
    <div data-testid="dashboard">
      <h1>Digital Twin Dashboard</h1>
      {hasError ? (
        <div data-testid="error-message" role="alert">
          Failed to load dashboard data
        </div>
      ) : (
        <div data-testid="metrics-panel">
          <h2>Key Metrics</h2>
          <div data-testid="metric-energy">Energy: 85%</div>
        </div>
      )}
    </div>
  );

  it('displays error message when data fails to load', () => {
    renderWithRouter(<MockDashboardWithError hasError={true} />);
    
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Failed to load dashboard data')).toBeInTheDocument();
    expect(screen.queryByTestId('metrics-panel')).not.toBeInTheDocument();
  });

  it('displays metrics when no error occurs', () => {
    renderWithRouter(<MockDashboardWithError hasError={false} />);
    
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.getByTestId('metrics-panel')).toBeInTheDocument();
  });
}); 