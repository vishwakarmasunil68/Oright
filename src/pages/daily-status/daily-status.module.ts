import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyStatusPage } from './daily-status';

@NgModule({
  declarations: [
    DailyStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyStatusPage),
  ],
})
export class DailyStatusPageModule {}
