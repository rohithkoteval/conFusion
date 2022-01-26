import { Component, OnInit } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Leader } from '../shared/leader';
import { LeaderService } from '../Services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leader:Leader;
  leaders:Leader[];

  constructor(private leaderService:LeaderService,private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.leaderService.getLeaders().subscribe((leaders)=>this.leaders=leaders);
    this.leaderService.getLeader(id);
  }

}
