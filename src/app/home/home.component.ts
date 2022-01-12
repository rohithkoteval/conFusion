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
  constructor(private dishservice:DishService,private promtionservice:PromotionService,private leaderService:LeaderService) {

   }

  ngOnInit(): void {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promtionservice.getFeaturedPromotion();
    this.featuredleader = this.leaderService.getFeaturedLeader();
  }

}
