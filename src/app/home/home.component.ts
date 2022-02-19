import { Component, OnInit,Inject } from '@angular/core';
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
  disherrMsg:string;
  constructor(private dishservice:DishService,private promotionservice:PromotionService,private leaderService:LeaderService,
    @Inject('BaseURL') public BaseURL) {

   }

  ngOnInit(): void {
     this.dishservice.getFeaturedDish().subscribe((dish)=>this.dish=dish);
     this.promotionservice.getFeaturedPromotion().subscribe((promotion)=>this.promotion=promotion);
    this.leaderService.getFeaturedLeader().subscribe((leader)=>this.featuredleader=leader);
  }

}
