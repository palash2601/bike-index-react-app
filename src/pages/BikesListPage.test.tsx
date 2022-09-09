import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import BikesListPage from './BikesListPage';
import { Bike } from '../bikeApi/types';

const mockSearchAPIResponse: Bike[] = [
  {
    id: 123,
    stolen_location: 'location',
    serial: 555,
    manufacturer_name: 'someone',
    year: 2020,
    title: 'awesome bike',
    status: 'stolen'
  }
];

jest.mock('../bikeApi/bikeApi', () => {
  const originalModule = jest.requireActual('../bikeApi/bikeApi');

  return {
    __esModule: true,
    ...originalModule,
    searchBikes: jest.fn()
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
  setSearchParams: jest.fn()
}));

import { useSearchParams, MemoryRouter as Router } from 'react-router-dom';
import { searchBikes } from '../bikeApi/bikeApi';

describe('when cityName does not exist', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (useSearchParams as jest.Mock).mockImplementation(() => [new URLSearchParams(), () => {}]);
    (searchBikes as jest.Mock).mockImplementation(() => Promise.resolve(mockSearchAPIResponse));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should not render list of bikes on search button click', async () => {
    render(
      <Router>
        <BikesListPage />
      </Router>
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: /Search/i
      })
    );

    expect(screen.queryByTestId(/bike/)).toBeNull();
  });

  test('should not render list of bikes on load', async () => {
    render(
      <Router>
        <BikesListPage />
      </Router>
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: /Search/i
      })
    );

    expect(screen.queryByTestId(/bike/)).toBeNull();
  });
});

describe('when button is clicked', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockImplementation(() => [
      new URLSearchParams('cityName=bar'),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}
    ]);
    (searchBikes as jest.Mock).mockImplementation(() => Promise.resolve(mockSearchAPIResponse));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should render list of bikes when search button is clicked and cityName exist', async () => {
    render(
      <Router>
        <BikesListPage />
      </Router>
    );

    const searchTextField = screen.getByLabelText('City name');
    fireEvent.change(searchTextField, { target: { value: 'my city' } });

    fireEvent.click(
      screen.getByRole('button', {
        name: /Search/i
      })
    );
    await waitForElementToBeRemoved(screen.queryByTestId('loading'));

    expect(screen.getAllByTestId(/bike/).length).toEqual(1);
  });
});

describe('when cityName exist as query param', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockImplementation(() => [new URLSearchParams('cityName=bar')]);
    (searchBikes as jest.Mock).mockImplementation(() => Promise.resolve(mockSearchAPIResponse));
  });
  test('should render list of bikes on load', async () => {
    render(
      <Router>
        <BikesListPage />
      </Router>
    );

    await waitForElementToBeRemoved(screen.queryByTestId('loading'));

    const numberOfResults = screen.getAllByTestId(/bike/).length;

    expect(numberOfResults).toEqual(mockSearchAPIResponse.length);
  });
});

describe('when search api return error', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockImplementation(() => [new URLSearchParams('cityName=bar')]);
    (searchBikes as jest.Mock).mockImplementation(() => Promise.reject());
  });
  test('should render error message', async () => {
    render(
      <Router>
        <BikesListPage />
      </Router>
    );

    await waitForElementToBeRemoved(screen.queryByTestId('loading'));

    expect(screen.getByText('Unexpected Error!')).toBeDefined();
  });
});
