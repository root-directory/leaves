import { Injectable } from '@angular/core';
import { Plant } from '../app/types/plant';
import { JournalEntry, Journal } from '../app/types/journalEntry';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as PlantActions from '../Rx/plants.actions';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  public ROOT_URL =
    'https://root-directory-server.herokuapp.com/api/v1/users/5ed2a8ad338bcf64692b07ac/';
  public PLANTS_URL = 'plants';
  private JOURNAL_URL = '/journal';
  public ROOT_SERVER_URL =
    'https://root-directory-server.herokuapp.com/api/v1/users/5ed2a8ad338bcf64692b07ac/plants';

  public result$: Observable<any> = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    const URL = this.ROOT_URL + this.PLANTS_URL;
    return this.http.get<Plant[]>(URL);
  }

  postCareForm(id: string, data: any) {
    const URL = this.ROOT_SERVER_URL + '/' + id;
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

  getPlant(id: number): Observable<Plant> {
    return this.getPlants().pipe(
      map((plants) => plants.find((plant) => plant.id === id))
    );
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

  uploadImage(url: string, fd: any): Observable<any> {
    return this.http.post(url, fd);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
