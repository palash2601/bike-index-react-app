import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import BikesList from './BikesList';
import { Bike } from '../bikeApi/types';

jest.mock('../bikeApi/bikeApi', () => {
  const originalModule = jest.requireActual('../bikeApi/bikeApi');

  return {
    __esModule: true,
    ...originalModule,
    searchBikes: jest.fn()
  };
});

import { searchBikes } from '../bikeApi/bikeApi';

const mockSearchAPIResponse: Bike[] = [
  {
    id: 123,
    stolen_location: 'location',
    serial: 555,
    manufacturer_name: 'someone',
    year: 2020,
    title: 'awesome bike',
    status: 'stolen'
  },
  {
    id: 456,
    stolen_location: 'location',
    serial: 555,
    manufacturer_name: 'someone',
    year: 2020,
    title: 'another awesome bike ',
    status: 'stolen'
  }
];

describe('BikesList', () => {
  beforeEach(() => {
    (searchBikes as jest.Mock).mockImplementation(() => Promise.resolve(mockSearchAPIResponse));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should not render list of bikes when cityName does not exist', async () => {
    render(
      <Router>
        <BikesList cityName={null} />
      </Router>
    );

    expect(screen.queryByTestId(/bike/)).toBeNull();
  });

  test('should render list of bikes when cityName exist', async () => {
    render(
      <Router>
        <BikesList cityName={'amsterdam'} />
      </Router>
    );

    await waitForElementToBeRemoved(screen.queryByTestId('loading'));

    const numberOfItems = screen.getAllByTestId(/bike/).length;

    expect(numberOfItems).toEqual(mockSearchAPIResponse.length);
  });
});

describe('BikesList when no search results is returned', () => {
  beforeEach(() => {
    (searchBikes as jest.Mock).mockImplementation(() => Promise.resolve([]));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should render No Bikes found message', async () => {
    render(
      <Router>
        <BikesList cityName={'Rotterdam'} />
      </Router>
    );

    await waitForElementToBeRemoved(screen.queryByTestId('loading'));

    expect(screen.getByText('No Bikes found')).toBeDefined();
  });
});
