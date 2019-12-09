import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MilkVolumePage } from './milk-volume';

@NgModule({
  declarations: [
    MilkVolumePage,
  ],
  imports: [
    IonicPageModule.forChild(MilkVolumePage),
  ],
})
export class MilkVolumePageModule {}
