import { GameService } from './../../services/game.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { TimerEvents } from 'src/app/core/enums';
import { TimerService } from '../../services/timer.service';
import { GameTextService } from 'src/app/core/services/game-text.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('input') input!: ElementRef;
  @HostListener('window:keydown.escape', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.restartGame();
    this.input.nativeElement.focus();
  }
  timerEvents = new Subject<TimerEvents>();
  correctText = '';
  wrongText = '';
  currentText = '';
  gameText = '';
  untouchedText = '';
  wordBreakArray: number[] = [];
  accuracyStatus = {
    oldCount: 0,
    numberOfWrongCharacter: 0,
    accuracy: 0,
  };
  isGameFinished = false;
  isTextWrong = false;
  WPM = 0;

  constructor(
    private timerService: TimerService,
    private gameService: GameService,
    private gameTextService: GameTextService
  ) {}

  ngOnInit(): void {
    this.initGameText();
  }

  initGameText() {
    this.gameText = this.gameTextService.getCurrentText();
    this.untouchedText = this.gameText;
    this.correctText = '';
    this.wrongText = '';
    this.currentText = '';
    this.wordBreakArray = this.getWordBreakArray();
  }

  onInput(ev: any) {
    // if (ev.inputType === 'insertFromPaste') {
    //   this.input.nativeElement.value = this.correctText;
    //   return;
    // }
    this.timerEvents.next(TimerEvents.Start);
    let validationObject = this.validateText(ev.target.value);
    this.calculateAccuracy(validationObject);
    this.WPM = this.calculateWMP(validationObject) ?? this.WPM;
    this.textHighlight(validationObject);
  }

  getWordBreakArray(): number[] {
    const spacesArray = [];
    for (let i = 0; i < this.gameText.length; i++) {
      if (this.gameText[i] === ' ') {
        spacesArray.push(i);
      }
    }
    spacesArray.push(this.gameText.length);

    return spacesArray;
  }

  validateText(inputText: string) {
    let isValid = true;
    let i = 0;
    let length = 0;
    while (isValid && i < inputText.length) {
      length = i;
      if (this.gameText[i] !== inputText[i]) {
        isValid = false;
        break;
      }
      i++;
    }
    return {
      isValid,
      errorStartingIndex: length,
      inputLength: inputText.length,
    };
  }

  textHighlight(validationObject: any) {
    let { isValid, errorStartingIndex, inputLength } = validationObject;

    if (inputLength === 0) {
      this.initHighlight();
      this.isTextWrong = false;
    }
    if (isValid === true && inputLength > 0) {
      this.clearTextHighlight();
      this.trueHighlight(errorStartingIndex);
      this.isTextWrong = false;
    } else if (isValid === false) {
      this.clearTextHighlight();
      this.isTextWrong = true;
      this.falseHighlight(errorStartingIndex, inputLength);
    }
    if (inputLength === this.gameText.length && isValid === true) {
      this.finishGame();
    }
  }

  initHighlight(): void {
    this.clearTextHighlight();
    let firstSpace = this.wordBreakArray[0] + 1;

    // overlaySelector.removeClass(errorOverlayClass);
    this.currentText = this.gameText.slice(0, firstSpace);
    this.untouchedText = this.gameText.slice(firstSpace, this.gameText.length);
  }

  trueHighlight(index: any) {
    // overlaySelector.removeClass(errorOverlayClass);
    for (let i = 0; i < this.wordBreakArray.length; i++) {
      if (index < this.wordBreakArray[i]) {
        this.currentText = this.gameText.slice(
          index + 1,
          this.wordBreakArray[i] + 1
        );
        this.untouchedText = this.gameText.slice(
          this.wordBreakArray[i] + 1,
          this.gameText.length
        );
        this.correctText = this.gameText.slice(0, index + 1);
        break;
      }
    }
  }

  falseHighlight(index: any, inputLength: any) {
    // errorSound[0].play();
    this.correctText = this.gameText.slice(0, index);
    this.currentText = '';
    this.wrongText = this.gameText.slice(index, inputLength);
    this.untouchedText = this.gameText.slice(inputLength, this.gameText.length);
    // overlaySelector.addClass(errorOverlayClass);
  }

  clearTextHighlight() {
    this.correctText = '';
    this.currentText = '';
    this.wrongText = '';
    this.untouchedText = this.gameText;
  }

  finishGame(): void {
    this.timerEvents.next(TimerEvents.Pause);
    this.isGameFinished = true;
    const gameStats = {
      accuracy: parseInt(this.accuracyStatus.accuracy.toFixed()),
      wpm: parseInt(this.WPM.toFixed()),
    };
    this.gameService.setfinishGame(gameStats);
  }

  restartGame(): void {
    this.clearInput();
    this.clearTextHighlight();
    this.timerEvents.next(TimerEvents.Restart);
    this.isGameFinished = false;
    this.WPM = 0;
    this.accuracyStatus = {
      oldCount: 0,
      numberOfWrongCharacter: 0,
      accuracy: 0,
    };
    this.isTextWrong = false;
  }

  nextGame() {
    this.restartGame();
    this.gameTextService.textFinished();
    this.initGameText();
  }

  pauseGame(): void {
    this.timerEvents.next(TimerEvents.Pause);
  }

  clearInput() {
    this.input.nativeElement.value = '';
  }

  calculateAccuracy(validationObject: any) {
    let accuracyStatus = validationObject.isValid;
    let inputLength = validationObject.inputLength;
    let accuracy;

    if (
      accuracyStatus === false &&
      this.accuracyStatus.oldCount < inputLength
    ) {
      this.accuracyStatus.numberOfWrongCharacter++;
    }
    this.accuracyStatus.oldCount = inputLength;
    accuracy =
      (inputLength /
        (inputLength + this.accuracyStatus.numberOfWrongCharacter)) *
      100;
    this.accuracyStatus.accuracy = accuracy;
  }

  calculateWMP(validationObject: any): number {
    let numberOfCharacters = validationObject.inputLength;
    let isValid = validationObject.isValid;
    if (!isValid) return 0;
    let wmp =
      numberOfCharacters / 5 / (this.timerService.getTime() / 1000 / 60);
    return wmp;
  }
}
