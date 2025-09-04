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
    expect(await screen.findByText(/Bitcoin \(Page 1, usd\)/i)).toBeInTheDocument();
    expect(screen.getByText("9999999")).toBeInTheDocument();
    expect(screen.getByTestId('currency-select')).toHaveValue('usd');

    //   expect(await screen.findByText(/67000 USD/)).toBeInTheDocument();

    // Change currency in the UI
    await userEvent.selectOptions(screen.getByTestId('currency-select'), ['eur']);

    // Assert new EUR mock data is rendered

    expect(await screen.findByText(/Bitcoin \(Page 1, eur\)/i)).toBeInTheDocument();
    expect(screen.getByText("777777777")).toBeInTheDocument();
    expect(screen.getByTestId('currency-select')).toHaveValue('eur');

   
    });

})