import { Injectable } from '@angular/core';
import { Plant } from '../app/types/plant';
import { JournalEntry } from '../app/journalEntry';
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
  private journalUrl = 'api/journalEntry';
  public result$: Observable<any> = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
      return this.http.get<Plant[]>(this.plantsUrl);
    // if(!this.result$){
      this.result$ = this.http
        .get<Plant[]>(this.plantsUrl)
        .pipe(catchError(this.handleError<Plant[]>('getPlants', [])));
      console.log('Plants request made');
    // }
      return this.result$;
  }

  getJournal(id:number): Observable<JournalEntry[]> {
   
      return this.http
        .get<JournalEntry[]>(this.journalUrl)
        .pipe(
          catchError(this.handleError<JournalEntry[]>('getJournal', [])));
      console.log('Journal request made');
  
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
    console.log(plant)
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
    return this.http.post<File>(this.plantsUrl,fd, {
      reportProgress:true,
      observe:'events'
    })
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
