import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, STORE_ID } from 'src/app/app.constants';
import { IStore } from 'src/app/models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreCallerService {

  private http = inject(HttpClient);

  constructor() { }

  getStore(): Observable<IStore> {
    return this.http.get<IStore>(
      `${BASE_URL}/stores/${STORE_ID}`
    );
  }
}
