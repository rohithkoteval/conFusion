import { Component, OnInit, Input } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../Services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    // let id = i.toString();
    this.dishservice.getDish(id).subscribe(dish=>this.dish=dish);
  }

  goBack(): void {
    this.location.back();
  }

}
