import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  week = [0, 1, 2, 3, 4, 5, 6];
  range = 7;
  constructor() {}

  ngOnInit() {}
}
