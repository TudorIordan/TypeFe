import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  startAt = 0;
  lapTime = 0;
  now = () => new Date().getTime();
  constructor() {}

  start() {
    this.startAt = this.startAt ? this.startAt : this.now();
  }
  stop() {
    // If running, update elapsed time otherwise keep it
    this.lapTime = this.startAt
      ? this.lapTime + this.now() - this.startAt
      : this.lapTime;
    this.startAt = 0; // Paused
  }
  reset() {
    this.lapTime = this.startAt = 0;
  }

  getTime(): number {
    return this.lapTime + (this.startAt ? this.now() - this.startAt : 0);
  }
}
