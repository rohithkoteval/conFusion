import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';
import { of,observable, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():Observable<Leader[]>{
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(Leaders),2000)
    // })
    return of(Leaders).pipe(delay(2000));
  }

  getLeader(id:string):Observable<Leader>{
  //   return new Promise(resolve=>{
  //     setTimeout(()=>resolve(Leaders.filter((leader)=>{leader.id === id})[0]),2000);
  // })
    return of(Leaders.filter((leader)=>{leader.id === id})[0]).pipe(delay(2000));
  }

  getFeaturedLeader():Observable<Leader>{
  //   return new Promise(resolve=>{
  //     setTimeout(()=>resolve(Leaders.filter((leader)=>leader.featured)[0]),2000);
  // })
  return of(Leaders.filter((leader)=>leader.featured)[0]).pipe(delay(2000));
 }}
