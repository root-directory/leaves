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
  private plantsUrl = 'api/plants'; // URL to web api
  private journalUrl = 'api/journals';
  public result$: Observable<any> = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    console.log(this.plantsUrl);
    return this.http.get<Plant[]>(this.plantsUrl);
    // if(!this.result$){
    this.result$ = this.http
        .get<Plant[]>(this.plantsUrl)
        .pipe(catchError(this.handleError<Plant[]>('getPlants', [])));
    console.log('Plants request made');
    // }
    return this.result$;
  }

  getJournal(id: number): Observable<Journal> {
    const url = `${this.journalUrl}/${id}`;
    console.log('Journal request made', id, url);
    return this.http
        .get<Journal>(url);

      // return this.http
      //   .get<Journal>(url)
      //   .pipe(
      //     catchError(this.handleError<Journal>('getJournal', {id:null,journalEntries:[]})));
  }

  addJournalEntry(journalEntry: JournalEntry): Observable<JournalEntry> {

    const url = `${this.journalUrl}/${1}/journalEntries`;
    return this.http.post<JournalEntry>(url, journalEntry, this.httpOptions).pipe(
      catchError(this.handleError<JournalEntry>('addJournal'))
    );
  }

  getPlant(id: number): Observable<Plant> {

    return this.getPlants().pipe(
      map(plants => plants.find(plant => plant.id === id))
    );

    // const url = `${this.plantsUrl}/${id}`;
    // return this.http
    //   .get<Plant>(url)
    //   .pipe(catchError(this.handleError<Plant>(`getPlant id=${id}`)));
  }

  /** POST: add a new plant to the server */
  addPlant(plant: Plant): Observable<Plant> {
    console.log(plant);
    return this.http
      .post<Plant>(this.plantsUrl, plant, this.httpOptions)
      .pipe(catchError(this.handleError<Plant>('addPlant')));
  }

  /** DELETE: delete the plant from the server */
  deletePlant(plant: Plant): Observable<{}> {
    const id = plant.id;
    const url = `${this.plantsUrl}/${id}`;

    console.log('deletePlant API', plant);

    // return this.http.delete<Plant>(url, this.httpOptions).pipe(
    //   catchError(this.handleError<Plant>('deletePlant'))
    // );
    return this.http.delete<Plant>(url, this.httpOptions);
  }

  uploadImage(fd){
    return this.http.post<File>(this.plantsUrl, fd, {
      reportProgress: true,
      observe: 'events'
    });
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
