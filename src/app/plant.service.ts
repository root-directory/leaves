import { Injectable } from '@angular/core';
import { Plant } from './plant';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private plantsUrl = 'api/plants'; // URL to web api
  public result$:Observable<any> = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  getPlants(): Observable<Plant[]> {
    // if(!this.result$){
      this.result$ = this.http
        .get<Plant[]>(this.plantsUrl)
        .pipe(catchError(this.handleError<Plant[]>('getPlants', [])));
      console.log('request made')
    // }
    return this.result$;
  }

  getPlant(id: number): Observable<Plant> {
   return this.result$.pipe(
      map(plants => plants.find(plant => plant.id === id))
    )
    
    // A request is made every time. Requiers the above code
    // return this.getPlants().pipe(
    //   map(plants => plants.find(plant => plant.id === id))
    // )

    // const url = `${this.plantsUrl}/${id}`;
    // return this.http
    //   .get<Plant>(url)
    //   .pipe(catchError(this.handleError<Plant>(`getPlant id=${id}`)));
  }

  /** POST: add a new plant to the server */
  addPlant(plant: Plant): Observable<Plant> {
    return this.http
      .post<Plant>(this.plantsUrl, plant, this.httpOptions)
      .pipe(catchError(this.handleError<Plant>('addPlant')));
  }

  /** DELETE: delete the plant from the server */
  deletePlant(plant: Plant | number): Observable<Plant> {
    const id = typeof plant === 'number' ? plant : plant.id;
    const url = `${this.plantsUrl}/${id}`;

    return this.http.delete<Plant>(url, this.httpOptions).pipe(
      catchError(this.handleError<Plant>('deletePlant'))
    );
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
