import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterTrainingService } from 'src/services/App/Register Training/register-training.service';



@Component({
  selector: 'app-register-training',
  templateUrl: './register-training.component.html',
  styleUrls: ['./register-training.component.scss'],
})
export class RegisterTrainingComponent implements OnInit {
  toppings = new FormControl(); 

  trainings: string[] = [];
  struments: string[] = [];

  isTimerEnabled = false; 

  //#region stepper
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  //#endregion

  constructor(private componentService: RegisterTrainingService, private _formBuilder: FormBuilder) { 
    this.asyncConstructor();
  }
  
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  async asyncConstructor() {
    /* Getting trainings from assets */
    const trainigs = await this.componentService.getTrainigs();
    this.trainings = JSON.parse(trainigs);

    const struments = await this.componentService.getStruments();
    this.struments = JSON.parse(trainigs);
  }

  //#region checks

  /**
   * Method to set as clicked/unclicked the checkbox
   */
  startTimeClicked() {
    this.isTimerEnabled = !this.isTimerEnabled;
  }
  //#endregion

  //#region listeners

  /**
   * Listener for time events from chrono-timer component
   * @param event stirng representing the time emitted 
   */
  definedTime(event) {
    this.componentService.definedTime = event;
    console.log('register-trainig defined time')
  }

  //#endregion
}
