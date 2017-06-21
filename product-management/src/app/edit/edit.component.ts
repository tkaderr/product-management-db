import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from './../http.service';
import { Product } from './../product';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  productslist=[];
	currproduct = new Product();
  index: number;
  currId;
	sub: Subscription
	paramSub: Subscription
	
  constructor(private _communicateService: HttpService, private _route: ActivatedRoute, private _router: Router) { 
  	this.sub = _communicateService.observedProduct.subscribe(
  		(updatedProducts) => { this.productslist = updatedProducts; console.log("sub-productslist",updatedProducts)
  		},
  		(err) => { console.log(err) },
  		() => {}
  	)
  	this.paramSub = this._route.params.subscribe((param)=>{
        this.index = param.id;
  	  	this.currproduct = this.productslist[param.id];
        this.currId = this.productslist[param.id]._id
      console.log('currproduct',this.currproduct)
      
  	})
  }

  ngOnInit() {
  }

   editItem() {
     console.log(this.currproduct);
     console.log(this.currId);
    this._communicateService.update(this.currproduct, this.currId)
    .then(data => {console.log("data updated", data);
    this.productslist[this.index] = this.currproduct;
    console.log("observable products", this.productslist);
    this._communicateService.updateProduct(this.productslist);
    // this._communicateService.retrieveAll()
		// .then( items => { console.log("db after edit", items) })
    // .catch( err => { console.log(err); })
    // console.log("loaded")
    //  this._router.navigate(['/productslist'])
  })
    .catch(err => {console.log("err", err);})
  }

  ngOnDestroy() {
  	this.sub.unsubscribe()
    this.paramSub.unsubscribe()
  }
}
