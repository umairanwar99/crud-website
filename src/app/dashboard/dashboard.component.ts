import { Component, OnInit } from '@angular/core';
import { data } from '../data';
import { ManageService } from '../manage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  records: data[] =[];

  constructor(private manageService: ManageService) { }

  ngOnInit(): void {
    this.getRecords();
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
