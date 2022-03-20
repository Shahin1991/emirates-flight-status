import { render, screen } from '@testing-library/react';
import FlightStatusList from './FlightStatusList';
import {flightList, airportList} from './test.data';

test('renders all departedText', () => {
    render(<FlightStatusList 
        flightList={flightList}
        airportList={airportList}
        />);
     const departedTextArray = screen.getAllByText(/departed/i);
     departedTextArray.every(departedText=>expect(departedText).toBeInTheDocument());
     const arrivedTextArray = screen.getAllByText(/arrived/i);
     arrivedTextArray.every(arrivedText=>expect(arrivedText).toBeInTheDocument());
  });


