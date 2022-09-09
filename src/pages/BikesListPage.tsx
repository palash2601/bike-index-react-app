import BikeSearchInput from '../components/BikeSearchInput';
import BikesList from '../components/BikesList';
import { useSearchParams } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

function BikesListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchChange(cityName: string) {
    setSearchParams({ cityName: cityName });
  }

  return (
    <>
      <h2 className="page-title">Search bikes</h2>
      <BikeSearchInput
        onSearchChange={handleSearchChange}
        value={searchParams.get('cityName')}></BikeSearchInput>
      <ErrorBoundary>
        <BikesList cityName={searchParams.get('cityName')}></BikesList>
      </ErrorBoundary>
    </>
  );
}

export default BikesListPage;
