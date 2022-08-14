import { MultiplayerModule } from './modules/multiplayer/multiplayer.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DashboardModule, MultiplayerModule, CoreModule],

  bootstrap: [AppComponent],
})
export class AppModule {}
