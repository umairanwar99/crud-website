import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import { data } from '../data';
import { ManageService } from '../manage.service';
import { InMemoryDataService } from '../in-memory-data.service';
@Component({
  selector: 'app-submission-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css']
})
export class SubmissionFormComponent implements OnInit{

  inst: Number[] = [1, 2, 3 , 4];

  model = new data(0, 'name', 0, 'dd/mm/yy', 0);

  submitted = false;
  edit = false;
  id= 0;

  constructor(
    private route:ActivatedRoute,
    private inMemory: InMemoryDataService,
    private location: Location,
    private manageService: ManageService, 
    private router: Router){

  }

  ngOnInit(): void {
    this.getRecord();
  }

  getRecord(): void {
    console.log(this.route);
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    if(this.id != 0){
      this.edit = true;
      this.manageService.getRecord(this.id)
      .subscribe(d => this.model = d);
    }

  }



  onSubmit() { 
    this.submitted = true;
    console.log(this.model);
    if(this.edit){
      this.manageService.updateRecord(this.model)
        .subscribe(()=>{console.log(this.model);});
    }
    else{
      this.manageService.addRecord(this.model)
      .subscribe();
    }
 
    this.router.navigate(['']);
      
  }

  newHero() {
    this.model = new data(42, '',0 ,'',0);
  }

}
