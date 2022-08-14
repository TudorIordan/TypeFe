import { Observable } from 'rxjs';
import { GameStatsResponse, UrlConstants } from '../enums';
import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(public httpGeneralService: HttpGeneralService) {}

  setGameStatistics(gameStats: any) {
    return this.httpGeneralService.post(
      UrlConstants.postGameStatistics,
      gameStats
    );
  }

  getGameStatistics(): any {
    return this.httpGeneralService.get(UrlConstants.postGameStatistics);
  }
}
