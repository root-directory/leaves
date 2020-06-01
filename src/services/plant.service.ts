import { Injectable } from '@angular/core';
import { Plant } from '../app/types/plant';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  public PLANTS_URL = 'api/plants'; // URL to web api
  // private liveURL = 'https://cors-test.appspot.com/test'
  private LIVE_URL = 'https://root-directory-server.herokuapp.com/api/v1/users/5ed2a8ad338bcf64692b07ac/plants'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {

      return this.http.get<Plant[]>(this.LIVE_URL,this.httpOptions);
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
    return this.http
      .post<Plant>(this.PLANTS_URL, plant, this.httpOptions)
      .pipe(catchError(this.handleError<Plant>('addPlant')));
  }

  /** DELETE: delete the plant from the server */
  deletePlant(plant: Plant): Observable<{}> {
    const id = plant.id;
    const url = `${this.PLANTS_URL}/${id}`;

    console.log('deletePlant API', plant);

    // return this.http.delete<Plant>(url, this.httpOptions).pipe(
    //   catchError(this.handleError<Plant>('deletePlant'))
    // );
    return this.http.delete<Plant>(url, this.httpOptions);
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
