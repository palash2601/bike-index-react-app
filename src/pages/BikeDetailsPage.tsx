import { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchBikeDetails } from '../bikeApi/bikeApi';
import { BikeDetails, BikeDetailsPayload } from '../bikeApi/types';
import { BikeDetailSkeleton } from '../components/BikeDetailSkeleton';
import useApi from '../hooks/useApi';

interface LocationState {
  previousPath: string;
}

function BikeDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { data, loading, request } = useApi<BikeDetails, BikeDetailsPayload>(fetchBikeDetails);

  const state = location.state as LocationState;
  const previousPath = state?.previousPath || '/';

  useEffect(() => {
    if (id) {
      request({ bikeId: id });
    }
  }, [id]);

  return (
    <div>
      <Link to={previousPath}>Back to search results</Link>
      {loading ? (
        <BikeDetailSkeleton />
      ) : !data ? (
        <p>no details found</p>
      ) : (
        <article>
          <h2>{data.title}</h2>
          <section className="container-2-col">
            <div>
              <img
                alt={data.public_images[0]?.name || data.title}
                src={data.public_images[0]?.medium}></img>
            </div>

            <section>
              <h3>Bike Details</h3>
              <dl>
                <dt>Manufacturer</dt>
                <dd>{data.manufacturer_name}</dd>
                <dt>Model</dt>
                <dd>{data.frame_model}</dd>
                <dt>Size</dt>
                <dd>{data.frame_size}</dd>
                <dt>Color</dt>
                <dd>{data.frame_colors}</dd>
              </dl>

              {data.stolen_record && (
                <>
                  <h3>Stolen Details</h3>
                  <dl>
                    <dt>Date</dt>
                    <dd>{data.stolen_record.date_stolen}</dd>
                    <dt>Location</dt>
                    <dd>{data.stolen_record.location}</dd>
                    <dt>Police department</dt>
                    <dd>{data.stolen_record.police_report_department}</dd>
                    <dt>Report number</dt>
                    <dd>{data.stolen_record.police_report_number}</dd>
                    <dt>Theft description</dt>
                    <dd>{data.stolen_record.theft_description}</dd>
                  </dl>
                </>
              )}
            </section>
          </section>
        </article>
      )}
    </div>
  );
}

export default BikeDetailsPage;
