import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { SnackBarComponent } from '../shared/components/ui-components/snack-bar/snack-bar/snack-bar.component';

@Component({
  selector: 'app-diet-form',
  templateUrl: './diet-form.component.html',
  styleUrls: ['./diet-form.component.css']
})

export class DietFormComponent implements OnInit {

  personalDetailsFormGroup: FormGroup;
  goalPlanDetailsFormGroup: FormGroup;
  otherDetailsFormGroup: FormGroup;
  completed: boolean = false;
  isLoading: boolean = false;
  linear: boolean = true;
  state: string;
  legacy = "legacy";
  col: number = 2;

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.personalDetailsFormGroup = this._formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{2,3})')]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
    this.goalPlanDetailsFormGroup = this._formBuilder.group({
      duration: ['', Validators.required],
      loseORgain: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      goals: ['', Validators.required],
    });
    this.otherDetailsFormGroup = this._formBuilder.group({
      foodAllergy: [''],
      medicalIssue: [''],
      foodType: ['', Validators.required],
      goingGym: ['', Validators.required]
    });
  }

  addPostfix(elementId: string) {
    const postFix = document.getElementById(elementId) as HTMLElement;
    if (postFix) {
      postFix.style.visibility = 'visible';
      postFix.style.opacity = '1';
    }
  }

  removePostfix(elementId: string) {
    if (this.goalPlanDetailsFormGroup.value.duration === '' || !this.goalPlanDetailsFormGroup.value.duration) {
      const postFix = document.getElementById('duration-label') as HTMLElement;
      postFix.style.visibility = 'hidden';
      postFix.style.opacity = '0';
    }
    if (this.goalPlanDetailsFormGroup.value.weight === '' || !this.goalPlanDetailsFormGroup.value.weight) {
      const weight = document.getElementById('weight-label') as HTMLElement;
      weight.style.visibility = 'hidden';
      weight.style.opacity = '0';
    }
  }


  personalDetailsFormObject: any;
  goalDetailsFormObject: any;
  otherDetailsFormObject: any;

  done() {
    this.personalDetailsFormObject = this.personalDetailsFormGroup.value;
    this.goalDetailsFormObject = this.goalPlanDetailsFormGroup.value;
    this.otherDetailsFormObject = this.otherDetailsFormGroup.value;
    this.completed = true;
    this.state = 'done';
  }

  submitForm() {
    this.isLoading = true;
    if (this.personalDetailsFormGroup.valid && this.goalPlanDetailsFormGroup.valid && this.otherDetailsFormGroup.valid) {
      // const ele = document.body.querySelector('#exampleModalCenter1')
      // console.log(ele);
      const formObj = Object.assign({}, this.personalDetailsFormGroup.value, this.goalPlanDetailsFormGroup.value, this.otherDetailsFormGroup.value, { domain: environment.domain });
      this.apiService.postEmail(formObj).subscribe(
        (res: any) => {
          this.isLoading = false;
          let snackBarRef = this._snackBar.openFromComponent(SnackBarComponent, {
            data: res['message'] + `!<br><br> <h6>We will connect you within 1-2 days with your diet plan.</h6>`
          });
          setTimeout(() => {
            snackBarRef.dismiss()
          }, 8000);
          // const serverSuccessDIV = document.getElementById('serverSuccess') as HTMLElement;
          // const serverMsgBtn = document.getElementById('serverMsgBtn') as HTMLElement;
          // serverSuccessDIV.style.visibility = 'visible';
          // serverSuccessDIV.style.opacity = '1';
          // serverSuccessDIV.style.transform = "translate(-50%, 0)";
          // serverMsgBtn.style.visibility = 'visible';
          // serverMsgBtn.style.opacity = '1';
          // serverSuccessDIV.innerHTML = res["message"] + `!<br> <h5>We will connect you within 1-2 days with your diet plan.</h5>`;
          // serverSuccessDIV.appendChild(serverMsgBtn);
        },
        err => {
          this.isLoading = false;
          console.log(err);
          let snackBarRef = this._snackBar.openFromComponent(SnackBarComponent, {
            data: err['statusText']
          });
          setTimeout(() => {
            snackBarRef.dismiss()
          }, 8000);
        }
      );
    }
    else {
      this.isLoading = false;
      return;
    }
  }

  onClearErrors() {
    const serverMsgBtn = document.getElementById('serverMsgBtn') as HTMLElement;
    serverMsgBtn.style.visibility = 'hidden';
    serverMsgBtn.style.opacity = '0';

    const serverSuccessDIV = document.getElementById('serverSuccess') as HTMLElement;
    serverSuccessDIV.style.visibility = 'hidden';
    serverSuccessDIV.style.opacity = '0';
    serverSuccessDIV.style.transform = "translate(-50%, 50px)";
  }
}