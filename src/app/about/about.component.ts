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
    this.leaders = this.leaderService.getLeaders();
    this.leader = this.leaderService.getLeader(id);
  }

}
