export interface Plant {
  id: string|number;
  name?: string;
  plantType: string;
  imgUrl?: string;
  plantImgs?: string[];
  plantNotes?: string;
  imageURL?: string;
  plantName?: string;
  userId?: string;
  lastWatered?: string;
  care?: {soil: Soil, watering: Watering, sunlight: Sunlight};
  alert?: {color: string, title: string, lastWatered: string, daysUntil: string};
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
