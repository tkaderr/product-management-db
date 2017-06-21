import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../product';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpService } from './../http.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  productslist = [];
  newproduct = new Product();
  sub:Subscription;

  constructor(private _communicateService: HttpService, private router: Router) {
  	this.sub = this._communicateService.observedProduct.subscribe(
  		(updatedProducts) => { this.productslist = updatedProducts; 
  			console.log(updatedProducts);
  		},
  		(err) => { console.log(err) },
  		() => {}
  	)
  }

  ngOnInit() {
  }

   ngOnDestroy() {
  	this.sub.unsubscribe();
  }

  createProduct(productform){
    this._communicateService.create(this.newproduct)
      .then( (all) =>{ console.log("success", all); 
      console.log(this.newproduct);
      console.log(this.productslist);
        this.productslist.push(this.newproduct);
        console.log(this.productslist);
        this._communicateService.updateProduct(this.productslist);
        console.log("it should work:", this.productslist)
        this.router.navigate(['/productslist']);
      })
      .catch( (err) => { console.log(err); })
  }

}
