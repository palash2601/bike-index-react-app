import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useApi from '../hooks/useApi';
import { searchBikes } from '../bikeApi/bikeApi';
import { Bike, SearchBikesPayload } from '../bikeApi/types';

import { BikesListSkeleton } from '../components/BikesListSkeleton';

function BikesList(props: { cityName: string | null }) {
  const { data, loading, request } = useApi<Bike[], SearchBikesPayload>(searchBikes);
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (props.cityName) {
      request({ cityName: props.cityName });
    }
  }, [props.cityName]);

  return (
    <>
      {loading && <BikesListSkeleton />}
      {data &&
        (data.length === 0 ? (
          <h2>No Bikes found</h2>
        ) : (
          <ul className="unstyled-list">
            {data.map((bike) => (
              <li key={bike.id} data-testid={`bike${bike.id}`}>
                <article className="card bike-card">
                  <h3>{bike.title}</h3>
                  <dl>
                    <dt>Year</dt>
                    <dd>{bike.year}</dd>
                    <dt>Location</dt>
                    <dd>{bike.stolen_location}</dd>
                    <dt>Serial</dt>
                    <dd>{bike.serial}</dd>
                    <dt>Status</dt>
                    <dd>{bike.status}</dd>
                  </dl>
                  <Link to={`/bike/${bike.id}`} state={{ previousPath: `${pathname}${search}` }}>
                    Bike Details
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        ))}
    </>
  );
}

export default BikesList;
