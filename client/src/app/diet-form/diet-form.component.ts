import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

// export interface StepType {
//   label: string;
//   fields: FormlyFieldConfig[];
// }

@Component({
  selector: 'app-diet-form',
  templateUrl: './diet-form.component.html',
  styleUrls: ['./diet-form.component.css']
})
export class DietFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  otherDetailsFormGroup: FormGroup;
  completed: boolean = false;
  linear: boolean = true;
  state: string;
  legacy = "legacy";
  col: number = 2;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,3})')]],
      gender: ['', [Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      duration: ['', Validators.required],
      loseORgain: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      age: ['', [Validators.required]],
      goals: ['', Validators.required],
    });
    this.otherDetailsFormGroup = this._formBuilder.group({
      foodAllergy: [''],
      medicalIssue: [''],
      foodType: ['', Validators.required],
      goingGym: ['', Validators.required]
    });
  }

  personalDetailsFormObject: any;
  goalDetailsFormObject: any;
  otherDetailsFormObject: any;

  done() {
    this.personalDetailsFormObject = this.firstFormGroup.value;
    this.goalDetailsFormObject = this.secondFormGroup.value;
    this.otherDetailsFormObject = this.otherDetailsFormGroup.value;
    this.completed = true;
    this.state = 'done';
  }
}