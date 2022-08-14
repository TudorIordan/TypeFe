import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { TokenInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HttpClientModule ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
