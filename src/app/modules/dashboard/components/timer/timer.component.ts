import { TimerEvents } from './../../../../core/enums';
import { TimerService } from './../../services/timer.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, Timestamp } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  timeString = '00:00:00';
  intervalId: any;
  private eventsSubscription!: Subscription;
  @Input() timerEvents!: Observable<TimerEvents>;
  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.eventsSubscription = this.timerEvents.subscribe((event) => {
      switch (event) {
        case TimerEvents.Start:
          this.intervalId = setInterval(() => this.updateTimer(), 1);
          this.timerService.start();
          break;
        case TimerEvents.Pause:
          this.timerService.stop();
          break;
        case TimerEvents.Stop:
          this.timerService.stop();
          break;
        case TimerEvents.Restart:
          this.timerService.reset();
          this.updateTimer();
          break;
      }
    });
  }

  updateTimer(): void {
    this.timeString = this.formatTime(this.timerService.getTime());
  }

  formatTime(time: number) {
    // let h;
    let m;
    let s;
    let ms;
    let newTime;

    // h = Math.floor(time / (60 * 60 * 1000));
    time = time % (60 * 60 * 1000);
    m = Math.floor(time / (60 * 1000));
    time = time % (60 * 1000);
    s = Math.floor(time / 1000);
    time = time % 1000;
    ms = Math.floor(time / 10);
    newTime =
      // `${h}`.padStart(2, '0') +
      // ':' +
      `${m}`.padStart(2, '0') +
      ':' +
      `${s}`.padStart(2, '0') +
      ':' +
      `${ms}`.padStart(2, '0');

    return newTime;
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
