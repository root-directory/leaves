import { Injectable } from '@angular/core';
import { Plant } from '../app/types/plant';
import { JournalEntry, Journal } from '../app/types/journalEntry';
import { Observable, of, EMPTY } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import * as PlantActions from '../Rx/plants.actions';
import { Alert } from '../app/types/alert';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  public ROOT_URL =
    'https://root-directory-server.herokuapp.com/api/v1/users/5ed2a8ad338bcf64692b07ac/';
  public PLANTS_URL = 'plants';
  public JOURNAL_URL = '/journal';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET: Retrive Plants from Server and modify to add watering alert. */
  getPlants(): Observable<Plant[]> {
    const URL = this.ROOT_URL + this.PLANTS_URL;
    const result$ = this.http.get<{ plants: Plant[] }>(URL).pipe(
      retry(5),
      map(({ plants }) => {
        plants = this.addWateringAlert(plants);
        return plants;
      })
    );
    return result$;
  }

  /** POST: add a new plant to the server */
  addPlant(plant: Plant): Observable<Plant> {
    const URL = this.ROOT_URL + this.PLANTS_URL;
    return this.http.post<Plant>(URL, plant);
  }

  /** DELETE: delete the plant from the server */
  deletePlant({ plant }: any): Observable<{}> {
    const URL = this.ROOT_URL + this.PLANTS_URL + '/' + plant.id;
    return this.http.delete<Plant>(URL);
  }

  addWateringAlert(plants: Plant[]) {

    const newPlants = plants.map((plant) => {
      let alert: Alert = {
        color: '',
        title: '',
        lastWatered: '',
        dayDelta: '',
      };
      const frequency = plant.care.watering.frequency;
      if (!frequency) {
        alert.title = `No Watering Frequency Found! Please update plant care form.`;
        alert.color = 'white';
        plant.alert = alert;
        return plant;
      }
      const datesDiff = Date.now() - parseInt(plant.lastWatered, 10);
      const daysDiff = Math.floor(datesDiff / (1000 * 60 * 60 * 24));
      let frequencyDays: number = parseInt(frequency, 10) * 7 || undefined;

      if (daysDiff > frequencyDays) {
        alert.title = `Your Plant is Thirsty!`;
        alert.lastWatered = `Last Watered:${daysDiff} days ago. `;
        alert.dayDelta = `Past Due by: ${daysDiff - frequencyDays} days!`;
        alert.color = 'red';
      } else {
        alert.title = `Nice Watering!`;
        alert.lastWatered = `Last Watered:${daysDiff} days ago. `;
        alert.dayDelta = `${
          frequencyDays - daysDiff
        } days until you need to water this plant!`;
        alert.color = 'green';
      }
      plant.alert = alert;
      return plant;
    });
    return newPlants;
  }

  postCareForm(id: string, data: any) {
    const URL = this.ROOT_URL + this.PLANTS_URL + '/' + id;
    return this.http.patch<any>(URL, data);
  }

  getJournal(plantId: string): Observable<Journal> {
    const URL =
      this.ROOT_URL + this.PLANTS_URL + '/' + plantId + this.JOURNAL_URL;
    return this.http.get<Journal>(URL);
  }

  addJournalEntry(
    journalEntry: any,
    plantId: string
  ): Observable<JournalEntry> {
    const URL =
      this.ROOT_URL + this.PLANTS_URL + '/' + plantId + this.JOURNAL_URL;
    return this.http.post<JournalEntry>(URL, journalEntry);
  }

  /** Upload Image: Get initial URL from Server (Routed through BE Hosted on AWS) */
  uploadImage(selectedFile): Observable<any> {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);

    const URL = 'https://root-directory-server.herokuapp.com/api/v1/photos';
    return this.http.post(URL, fd);
  }
}
