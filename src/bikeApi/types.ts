export interface Bike {
  id: number;
  stolen_location: string;
  serial: number;
  manufacturer_name: string;
  year: number;
  title: string;
  status: string;
}

interface StolenRecord {
  created_at: number;
  date_stolen: string;
  location: string;
  police_report_department: string | null;
  police_report_number: string | null;
  theft_description: string | null;
}

export interface BikeDetails extends Bike {
  description: string;
  frame_colors: string[];
  frame_material_slug: string;
  frame_model: string;
  frame_size: string;
  handlebar_type_slug: string;
  public_images: {
    full: string;
    id: number;
    large: string;
    medium: string;
    name: string;
    thumb: string;
  }[];
  type_of_cycle: string;
  stolen_record?: StolenRecord | null;
}

export interface SearchBikesPayload {
  cityName: string;
}

export interface BikeDetailsPayload {
  bikeId: string;
}

export type SearchBikes = {
  (payload: SearchBikesPayload): Promise<Bike[]>;
};
