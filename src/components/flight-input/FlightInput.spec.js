import { render, screen } from '@testing-library/react';
import FlightInput from './FlightInput';
import {airportList} from './test.data';

test('renders all departedText and arrivedText', () => {
    const { container } = render(<FlightInput 
        airportList={airportList}
        />);
  });