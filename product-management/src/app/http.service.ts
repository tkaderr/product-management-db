import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs";

@Injectable()
export class HttpService {
  observedProduct = new BehaviorSubject(null)

  constructor(private _http: Http) { }
  
  updateProduct(items: Array<object>) {
    this.observedProduct.next(items)
  }

  retrieveAll() {
    return this._http.get('/products')
    .map( data => data.json() )
    .toPromise();
  }
  retrieveOne(id) {
    return this._http.get('/one/products/${id}')
    .map( data => data.json() )
    .toPromise();
  }
  create(product) {
    return this._http.post('/products', product)
    .map( data => data.json() )
    .toPromise();
  }
  update(product, id) {
    return this._http.put(`/edit/products/${id}`, product)
    .map( data => data.json() )
    .toPromise();
  }
  destroy(product,id) {
    return this._http.put(`/destroy/products/${id}`, product)
    .map( data => data.json() )
    .toPromise();
  }

}
