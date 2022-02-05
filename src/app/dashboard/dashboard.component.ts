import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { data } from '../data';
import { ManageService } from '../manage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  records : data[] = [];
  records$!: Observable<data[]>;
  myrecords : data[] = [];
  searched = false;
  private searchTerms = new Subject<string>();

  constructor(private manageService: ManageService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    if (term != ""){
      this.searched = true;
      
      this.records.forEach(r => {
        if(r.name.includes(term)){
          this.myrecords.push(r);
      }});
      console.log(this.myrecords);
      //this.myrecords = r;

    }
    else
    {
      this.searched = false;
    }
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.getRecords();
    this.records$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.manageService.searchRecords(term)),
    );
  }

  getRecords(): void {
    this.manageService.getRecords()
        .subscribe(d => this.records = d);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.manageService.addRecord({ name } as data)
      .subscribe(d => {
        this.records.push(d);
      });
  }

  delete(d: data): void {
    this.records = this.records.filter(da => da !== d);
    this.manageService.deleteRecord(d.id).subscribe();
  }

  selectedHero?: data;
  onSelect(d: data): void {
    this.selectedHero = d;
  }




}
