import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DecoratorTimeService} from '../../../services/decorator-time.service';
import {DecoratorReloadTimerService} from '../../../services/decorator-reload-timer.service';

@Component({
  selector: 'app-decorator-time-picker',
  templateUrl: './decorator-time-picker.component.html',
  styleUrls: ['./decorator-time-picker.component.css']
})
export class DecoratorTimePickerComponent implements OnInit, OnDestroy {

  useRealTime = this.decoratorTimeService.getUseRealTime();

  private _timeSubscription;

  constructor(
    private decoratorReloadTimerService: DecoratorReloadTimerService,
    private decoratorTimeService: DecoratorTimeService) {
    this.subscribeTime();
  }

  ngOnInit() {
  }

  /**
   * Toggles between manual date pick and real-time mode
   */
  toggleManualDate() {
    this.useRealTime = !this.useRealTime;
    this.decoratorTimeService.setUseRealTime(this.useRealTime);
  }

  /**
   * Subscription to the time service
   */
  private subscribeTime() {
    this._timeSubscription = this.decoratorTimeService.onRealTimeChange.subscribe((value) => {
      this.useRealTime = value;
    });
  }

  ngOnDestroy() {
    if (this._timeSubscription) {
      this._timeSubscription.unsubscribe();
    }
  }
}
