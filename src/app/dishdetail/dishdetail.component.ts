import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../Services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup,NgForm, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  providers: [DatePipe]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds:string[];
  prev:string;
  next:string;
  commentForm:FormGroup;
  comment:Comment;
  myDate:Date;
  errMsg:string;
  dishcopy:Dish;
  @ViewChild('fform') commentFormDirective:NgForm;

  constructor(private fb:FormBuilder,private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,private datePipe: DatePipe,
    @Inject('BaseURL') public BaseURL) { this.createForm(); 
    }

    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish;this.setPrevNext(dish.id); },
      errmsg=> this.errMsg=<any>errmsg);
    // let id = i.toString();
    // this.dishservice.getDish(id).subscribe(dish=>this.dish=dish);
      // this.myDate
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  formErrors = {
    'author': '',
    'rating': '',
    'comment': '',
    'date': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'rating is required.',
    },
    'comment': {
      'required':      'comment is required.',
    },
    'date': {
      'required':      'date is required.',
    },
  };

  createForm(){
    this.commentForm = this.fb.group({
      author:['',Validators.required],
      rating:['',Validators.required],
      comment:['',Validators.required],
      date:''
    });

    this.commentForm.valueChanges.subscribe((data)=>this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    // this.dishservice
    // this.myDate = new Date;
    this.comment.date = new Date().toISOString();
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { 
      this.dishcopy.comments.push(this.comment)
    // this.dishcopy.comments.push({
    //   'rating':this.comment.rating,
    //   'comment':this.comment.comment,
    //   'author':this.comment.author,
    //   'date':this.myDate.toString()
    // })}
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmsg => { this.dish = null; this.dishcopy = null; this.errMsg = <any>errmsg; });
    })
    
    this.commentForm.reset({
      author:'',
      rating:'',
      comment:'',
      date:''
    });
    this.commentFormDirective.resetForm();
  }

  formatLabel(value: number) {
    if (value >= 1 && value<=5) {
      return Math.round(value / 1);
    }
    return value;
  }
}
