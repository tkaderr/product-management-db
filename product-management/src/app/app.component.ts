import { Component } from '@angular/core';
import { Product } from './product';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productslist = [];

	// constructor(private _communicateService: HttpService) {
		
	// 	_communicateService.updateProduct(this.productslist);
  // 	}

  constructor(private _communicateService: HttpService) {
    _communicateService.retrieveAll()
		.then( items => { this.productslist = items
    _communicateService.updateProduct(this.productslist)})
    .catch( err => { console.log(err); })
    console.log("loaded")
  }
}
