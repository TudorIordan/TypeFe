import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameTextService {
  private currentTextIndex = 0;
  private textList = [
    "You have to realize early on in life that nobody's perfect and you just have to live with that.",
    "Happiness often sneaks in through a door you didn't know you left open.",
    "When you have a dream, you've got to grab it and never let go.",
    'Life is like riding a bicycle. To keep your balance, you must keep moving',
  ];

  constructor() {}

  getCurrentText(): string {
    return this.textList[this.currentTextIndex];
  }

  textFinished() {
    console.log(this.currentTextIndex);
    this.currentTextIndex =
      this.currentTextIndex < this.textList.length - 1
        ? ++this.currentTextIndex
        : 0;
    console.log(this.currentTextIndex);
  }
}
