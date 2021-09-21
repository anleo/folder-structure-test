import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {FolderItemClass} from '../models/folder-item';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class PaymeService {

  private requestUrl = 'https://preprod.paymeservice.com/api/generate-sale';

  constructor(private http: HttpClient) {
  }

  getIframeUrl(data?: FolderItemClass): Observable<any> {
    if (!data) {
      return throwError(new Error('Something went wrong'));
    }

    const selectedFiles = data.getSelected(data?.children);

    if (!selectedFiles?.length) {
      return throwError(new Error('No selected files'));
    }

    const price = selectedFiles.reduce((acc, cur: FolderItemClass) => {
    	return acc + (cur?.price || 0);
    }, 0);

    const products = selectedFiles.map((file: FolderItemClass) => file.name).join(', ');

    return this.http
      .post(this.requestUrl, {
        sale_price: price * 100,
        seller_payme_id: 'MPL14985-68544Z1G-SPV5WK2K-0WJWHC7N',
        currency: 'USD',
        product_name: products,
        language: 'en',
      })
      .pipe(take(1));
  }
}
