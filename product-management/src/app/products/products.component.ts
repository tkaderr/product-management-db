import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpService } from './../http.service';
import { Product } from './../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productslist=[];
	sub: Subscription;

  constructor(private _communicateService: HttpService) { 
  	this.sub = _communicateService.observedProduct.subscribe(
			(updatedItems) => {  this.productslist = updatedItems; },
			(err) => { console.log('error')},
			() => { }
		)}
  
  ngOnInit() {
    }

    ngOnDestroy() {
      this.sub.unsubscribe()
    }

    deleteProduct(i){
      console.log("starting delete")
      this._communicateService.destroy(this.productslist, this.productslist[i]._id)
      console.log("deleted the item:", i)
      this.productslist.splice(i,1);
      this._communicateService.updateProduct(this.productslist);
    }

}

  

