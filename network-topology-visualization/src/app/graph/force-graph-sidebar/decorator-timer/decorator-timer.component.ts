import {Component, Input, OnDestroy} from '@angular/core';
import {DecoratorReloadTimerService} from '../../../services/decorator-reload-timer.service';
import {DecoratorEventService} from '../../../services/decorator-event.service';
import {DecoratorCategoryEnum} from '../../../model/enums/decorator-category-enum';
import {DecoratorTimeService} from '../../../services/decorator-time.service';

/**
 * Visual component to change decorator reload times. Communicates with decorator reload timer service.
 */
@Component({
  selector: 'app-decorator-timer',
  templateUrl: './decorator-timer.component.html',
  styleUrls: ['./decorator-timer.component.css']
})
export class DecoratorTimerComponent implements OnDestroy {

  manualDecoratorReload: boolean;

  reloadPeriod: number;
  reloadPeriodTemp: number;
  inputNumberMin: number;
  inputNumberMax: number;

  private _timeSubscription;

  constructor(
    private decoratorEventService: DecoratorEventService,
    private decoratorReloadTimerService: DecoratorReloadTimerService,
    private decoratorTimeService: DecoratorTimeService) {
    this.setInitialValues();
    this.subscribeTimeChanges();
  }

  /**
   * Sets value of reload period to given value
   */
  periodChange(input) {
    const value: number = parseInt(input, 10);
    if (!Number.isNaN(value) ) {
      this.decoratorReloadTimerService.setReloadPeriod(value);
      this.reloadPeriod = this.decoratorReloadTimerService.getReloadPeriod();
    }
  }

  /**
   * Toggles between automatic and manual reload of decorators and call appropriate services
   */
  toggleDecoratorReload() {
    this.manualDecoratorReload = !this.manualDecoratorReload;
    if (this.manualDecoratorReload) {

      this.reloadPeriodTemp = this.reloadPeriod;
      this.decoratorTimeService.setUseRealTime(false);
      this.reloadPeriod = this.decoratorReloadTimerService.getReloadPeriod();
    } else {

      this.decoratorReloadTimerService.setReloadPeriod(this.reloadPeriodTemp);
      this.decoratorTimeService.setUseRealTime(true);
      this.reloadPeriod = this.decoratorReloadTimerService.getReloadPeriod();
      this.sendReloadRequests();
    }
  }

  /**
   * Sets variables to its initial values
   */
  private setInitialValues() {
    this.reloadPeriod = this.decoratorReloadTimerService.getReloadPeriod();
    this.reloadPeriodTemp = this.reloadPeriod;
    this.manualDecoratorReload = !this.decoratorTimeService.getUseRealTime();

    this.inputNumberMin = DecoratorReloadTimerService.MIN_VALUE;
    this.inputNumberMax = DecoratorReloadTimerService.MAX_VALUE;
  }

  /**
   * Subscribes to changes of superior DecoratorTimeService to turn off refresh if manual mode is set.
   */
  private subscribeTimeChanges() {
    this._timeSubscription = this.decoratorTimeService.onRealTimeChange.subscribe((value => {
      this.manualDecoratorReload = !value;
      if (!this.manualDecoratorReload) {
        this.reloadPeriod = this.decoratorReloadTimerService.getReloadPeriod();
      }
    }));
  }

  /**
   * Sends initial reload requests after decorators reload toggle is set to automatic
   */
  private sendReloadRequests() {
    this.decoratorEventService.triggerDecoratorReloadRequest( DecoratorCategoryEnum.RouterDecorators, null);
    this.decoratorEventService.triggerDecoratorReloadRequest( DecoratorCategoryEnum.HostDecorators, null);
    this.decoratorEventService.triggerDecoratorReloadRequest( DecoratorCategoryEnum.LinkDecorators, null);
  }

  ngOnDestroy() {
    if (this._timeSubscription) {
      this._timeSubscription.unsubscribe();
    }
  }
}
