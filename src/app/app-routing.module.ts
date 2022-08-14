import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './modules/dashboard/page/page.component';
import { RoomComponent } from './modules/multiplayer/components/room/room.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
  },
  {
    path: 'multiplayer',
    component: RoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
