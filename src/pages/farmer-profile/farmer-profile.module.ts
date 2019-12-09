import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmerProfilePage } from './farmer-profile';

@NgModule({
  declarations: [
    FarmerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(FarmerProfilePage),
  ],
})
export class FarmerProfilePageModule {}
