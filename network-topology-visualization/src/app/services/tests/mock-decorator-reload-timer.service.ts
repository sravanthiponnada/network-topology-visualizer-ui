import {DecoratorReloadTimerService} from '../decorator-reload-timer.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export class MockDecoratorReloadTimerService extends DecoratorReloadTimerService {

  private subject: Subject<number> = new Subject();
  onReloadPeriodChange: Observable<number> = this.subject.asObservable();

  turnOffAutomaticReload() {
    console.log(0);
    this.subject.next(0);
  }
  turnOnAutomaticReload() {
    this.subject.next(1);
  }
  getReloadPeriod(): number {
    return 1;
  }

}
