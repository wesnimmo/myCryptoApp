import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/Header';
import Home from './page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Home integration test', () => {

    beforeEach(() => {
        
           
            const queryClient = new QueryClient();
            render(
                <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Header />
                    <Home />
                </ThemeProvider>
                </QueryClientProvider>
            );
            

    })

    test('shows USD data by default, and updates when switching to EUR', async () => {


    // Assert initial USD mock data is rendered (from MSW)
    expect(await screen.findByText(/Bitcoin.*67000 USD/i)).toBeInTheDocument();

    //   expect(await screen.findByText(/67000 USD/)).toBeInTheDocument();

    // Change currency in the UI
    await userEvent.selectOptions(screen.getByTestId('currency-select'), ['eur']);

    // Assert new EUR mock data is rendered
    expect(await screen.findByText(/62000 EUR/)).toBeInTheDocument();
    });

})