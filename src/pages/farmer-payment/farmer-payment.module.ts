import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmerPaymentPage } from './farmer-payment';

@NgModule({
  declarations: [
    FarmerPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmerPaymentPage),
  ],
})
export class FarmerPaymentPageModule {}
