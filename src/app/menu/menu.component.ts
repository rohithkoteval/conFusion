import { Component, Inject, OnInit } from '@angular/core';
import { DishService } from '../Services/dish.service';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes'



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes:Dish[];
  errMsg:string;

  // selectedDish:Dish;

  constructor(private dishService:DishService,
    @Inject('BaseURL') public baseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes)=>this.dishes=dishes);
  }

  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }

}
