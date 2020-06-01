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
  imageURL?:string;
  plantName?:string;
}
