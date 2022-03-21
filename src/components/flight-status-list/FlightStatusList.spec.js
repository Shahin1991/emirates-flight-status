import { render, screen } from '@testing-library/react';
import FlightStatusList from './FlightStatusList';
import {flightList, airportList} from './test.data';

test('renders all departedText and arrivedText', () => {
    render(<FlightStatusList 
        flightList={flightList}
        airportList={airportList}
        />);
     const departedTextArray = screen.getAllByText(/departed/i);
     departedTextArray.every(departedText=>expect(departedText).toBeInTheDocument());
     const arrivedTextArray = screen.getAllByText(/arrived/i);
     arrivedTextArray.every(arrivedText=>expect(arrivedText).toBeInTheDocument());
  });

test('renders warning message when there no flight list', () => {
    render(<FlightStatusList 
        flightList={[]}
        airportList={airportList}
        />);
     const noFlightMessageText = screen.getByText(/Please select a valid flight combination/i);
     expect(noFlightMessageText).toBeInTheDocument();

  });


