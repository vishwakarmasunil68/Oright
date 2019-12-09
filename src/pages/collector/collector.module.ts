import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectorPage } from './collector';

@NgModule({
  declarations: [
    CollectorPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectorPage),
  ],
})
export class CollectorPageModule {}
