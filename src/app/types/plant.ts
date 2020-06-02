export interface Plant {
  id: number;
  name?: string;
  plantType: string;
  imgUrl?: string;
  plantImgs: string[];
  plantWatering: number;
  plantSoil: string;
  plantSunlight: string;
  plantNotes: string;
  imageURL?: string;
  plantName?: string;
  care?: {soil: Soil, watering: Watering, sunlight: Sunlight};
}

interface Soil {
  type: string;
  last: string;
  notes: string;
}

interface Watering {
  frequency: string;
  last: string;
  notes: string;
}

interface Sunlight {
  duration: string;
  direction: string;
  notes: string;
}
