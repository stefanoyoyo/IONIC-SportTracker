import { Injectable } from '@angular/core';
import { StringHelper } from 'src/helpers/StringHelper';
import { AssetsService } from 'src/services/Helpers/assets/assets.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterTrainingService {

  //#region fields
  definedTime = '';

  stepsComplete = [false, false, false];

  repeat: unknown; /* Timeout */

  //#region component fields

  before_training_weight: string = "";

  //#endregion

  //#endregion

  constructor(private assets: AssetsService) { 
    this.repeatChecks();
  }

  //#region async methods

  async getTrainigs(): Promise<string> {
    const trainings = await this.assets.getFile('assets/trainings.json');
    return JSON.stringify(trainings);
  }

  async getStruments() : Promise<string> {
    const struments = await this.assets.getFile('assets/sport-struments.json');
    return JSON.stringify(struments);
  }

  async getStepsName() {
    const stepsName = await this.assets.getFile('assets/register-training-stepper.json');
    return JSON.stringify(stepsName);
  }

  async getPreWeightTimes() {
    const preWeightTimes = await this.assets.getFile('assets/Preweight-measuement-times.json');
    return JSON.stringify(preWeightTimes);
  }

  //#endregion

  /* Method to repeat constantly some operations */
  public repeatChecks() {
    this.repeat = setInterval(() => {
      this.checkComplete();
      this.preWeightInput();
    }, 500);
  }

  //#region check if steps are complete 

  /** Method always checking the state of the stepper steps */
  public checkComplete(): void {
      this.stepsComplete.forEach((element, index) => {
        this.isStepComplete(index);
      });
  }

  public isStepComplete(id: number): boolean
  {
    let isComplete = false;
    switch (id) {
      case 0:
        this.stepsComplete[0] = this.isStepOneComplete();
        break;
      case 1:
        this.stepsComplete[1] = this.isStepTwoComplete();
        break;
      case 2:
        this.stepsComplete[2] = this.isStepThreeComplete();
        break;
      default:
        break;
    }
    return isComplete;
  }

  /** Method checking if the step 3 is complete */
  isStepOneComplete() {
    return this.before_training_weight != "";
  }

  /** Method checking if the step 2 is complete */
  isStepTwoComplete() {
    return false;
  }
  
  /** Method checking if the step 1 is complete */
  isStepThreeComplete() {
    return false;
  }

  //#endregion

  //#region component checks

  /**Method checking whether the input character from the user is valid or not. */
  isPreWeightValid(char: string) {
    return StringHelper.hasOnlyNumbers(char);
  }

  /* Method to delete the input stringh whether it's not valid. */
  preWeightInput(): void {
    const onlyNumbers = 
      StringHelper.hasOnlyNumbers(this.before_training_weight) && 
      this.isValidWeight(this.before_training_weight);
    if (!onlyNumbers) {
      this.before_training_weight = '';
    };
  }

  /** Method to check id the inputted number is valid. 
   * (E.C.: 07 is not valid) */
  isValidWeight(before_training_weight: string): boolean {
    return this.isFirstNumberValid(before_training_weight)
  }

  isFirstNumberValid(before_training_weight: string): boolean {
    const firstNum = before_training_weight[0];
    return firstNum !== '0'  && 
            firstNum !== '1' && 
            firstNum !== '2' &&
            firstNum !== '3' ;
  }

  //#endregion

}