import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromtions():Observable<Promotion[]>{
  //   return new Promise(resolve=>{
  //     setTimeout(()=>resolve(PROMOTIONS),2000);
  // });
   return of(PROMOTIONS).pipe(delay(2000));
}

  getPromtion(id:string):Observable<Promotion>{
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(PROMOTIONS.filter((promotion)=>{promotion.id === id})[0]),2000);
    // });
    return of(PROMOTIONS.filter((promotion)=>{promotion.id === id})[0]).pipe(delay(2000));
  }

  getFeaturedPromotion():Observable<Promotion>{
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(PROMOTIONS.filter((promotion)=>promotion.featured)[0]),2000);
    // });
    return of(PROMOTIONS.filter((promotion)=>promotion.featured)[0]).pipe(delay(2000));
  }
}
