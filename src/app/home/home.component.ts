import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../Services/dish.service';
import { Promotion } from '../shared/promotion';
import { LeaderService } from '../Services/leader.service';
import { PromotionService } from '../Services/promotion.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion:Promotion;
  featuredleader:Leader;
  constructor(private dishservice:DishService,private promotionservice:PromotionService,private leaderService:LeaderService) {

   }

  ngOnInit(): void {
     this.dishservice.getFeaturedDish().then((dish)=>this.dish=dish);
     this.promotionservice.getFeaturedPromotion().then((promotion)=>this.promotion=promotion);
    this.leaderService.getFeaturedLeader().then((leader)=>this.featuredleader=leader);
  }

}
