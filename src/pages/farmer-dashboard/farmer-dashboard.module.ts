import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmerDashboardPage } from './farmer-dashboard';

@NgModule({
  declarations: [
    FarmerDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmerDashboardPage),
  ],
})
export class FarmerDashboardPageModule {}
