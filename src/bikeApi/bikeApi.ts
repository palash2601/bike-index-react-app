import { Bike, BikeDetails, BikeDetailsPayload, SearchBikes } from './types';

const HOST = `https://bikeindex.org/api/v3`;

const API_URLS = {
  SEARCH: '/search/',
  BIKES: '/bikes/'
};

type FetchOptions<S> = {
  method: string;
  body: S;
};

function fetchApi<T, S = void>(url: string, options?: FetchOptions<S>): Promise<T> {
  const { method, body } = options ?? {};
  return fetch(url, {
    method,
    body: body && JSON.stringify(body)
  }).then((response) => {
    if (response.ok) {
      return response.json() as unknown as T;
    }
    throw new Error('Something went wrong');
  });
}

export const searchBikes: SearchBikes = async ({ cityName }) => {
  const { bikes } = await fetchApi<{ bikes: Bike[] }>(
    `${`${HOST}${API_URLS.SEARCH}`}?page=1&per_page=10&location=${cityName.toLowerCase()}&distance=10&stolenness=proximity`
  );
  const bikesList: Bike[] = [];
  bikes.forEach((item) => {
    const { id, stolen_location, serial, manufacturer_name, year, title, status }: Bike = item;

    bikesList.push({
      id,
      stolen_location,
      serial,
      manufacturer_name,
      year,
      title,
      status
    });
  });
  return bikesList;
};

export async function fetchBikeDetails({ bikeId }: BikeDetailsPayload): Promise<BikeDetails> {
  const { bike } = await fetchApi<{ bike: BikeDetails }>(`${HOST}${API_URLS.BIKES}${bikeId}`);
  const {
    id,
    description,
    status,
    frame_colors,
    frame_material_slug,
    frame_model,
    frame_size,
    handlebar_type_slug,
    public_images,
    manufacturer_name,
    title,
    type_of_cycle,
    year,
    serial,
    stolen_location,
    stolen_record = null
  } = bike;

  const bikeDetails: BikeDetails = {
    id,
    description,
    status,
    frame_colors,
    frame_material_slug,
    frame_model,
    frame_size,
    handlebar_type_slug,
    public_images,
    manufacturer_name,
    title,
    type_of_cycle,
    year,
    serial,
    stolen_location,
    stolen_record
  };

  if (bikeDetails.stolen_record?.date_stolen) {
    const date = new Date(parseInt(bikeDetails.stolen_record.date_stolen, 10) * 1000);
    bikeDetails.stolen_record.date_stolen = date.toLocaleDateString();
  }

  return bikeDetails;
}
