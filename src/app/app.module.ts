import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '../../node_modules/@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LandingScreenPage} from "../pages/landing-screen/landing-screen";
import {LoginPage} from "../pages/login/login";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import {MilkVolumePage} from "../pages/milk-volume/milk-volume";
import {FarmerDashboardPage} from "../pages/farmer-dashboard/farmer-dashboard";
import {CollectorPage} from "../pages/collector/collector";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar";
import {DailyStatusPage} from "../pages/daily-status/daily-status";
import { HomeMessageProvider } from '../providers/home-message/home-message';
import {FarmerPaymentPage} from "../pages/farmer-payment/farmer-payment";
import {FarmerRecievePaymentPage} from "../pages/farmer-recieve-payment/farmer-recieve-payment";
import {FarmerProfilePage} from "../pages/farmer-profile/farmer-profile";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingScreenPage,
    LoginPage,
    ForgotPasswordPage,
    MilkVolumePage,
    FarmerDashboardPage,
    CollectorPage,
    ProgressBarComponent,
    DailyStatusPage,
    FarmerPaymentPage,
    FarmerRecievePaymentPage,
    FarmerProfilePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingScreenPage,
    LoginPage,
    ForgotPasswordPage,
    MilkVolumePage,
    FarmerDashboardPage,
    CollectorPage,
    DailyStatusPage,
    FarmerPaymentPage,
    FarmerRecievePaymentPage,
    FarmerProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HomeMessageProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeMessageProvider
  ]
})
export class AppModule {}
