import { Component } from '@angular/core';
import {Events, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LandingScreenPage} from "../pages/landing-screen/landing-screen";
import { LoginPage } from '../pages/login/login';
import {MilkVolumePage} from "../pages/milk-volume/milk-volume";
import {FarmerDashboardPage} from "../pages/farmer-dashboard/farmer-dashboard";
import {BaseComp} from "../utils/BaseComp";
import {HomeMessageProvider} from "../providers/home-message/home-message";
import {FarmerProfilePage} from "../pages/farmer-profile/farmer-profile";
import {CollectorPage} from "../pages/collector/collector";
@Component({
  templateUrl: 'app.html'
})
export class MyApp extends BaseComp{
  rootPage:any;
  submenuVisible: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private events:Events,private homeMessage:HomeMessageProvider) {
    super();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(this.getItem(this.IS_LOGIN)=="1"){
        this.rootPage=FarmerDashboardPage;
      }else{
        this.rootPage=LoginPage;
      }
      // this.rootPage=CollectorPage;


    });
  }

  menuClicked(data): void {
    console.log("menu item clicked:-" + data);
    this.homeMessage.sendMessage(data);
    // this.events.publish('menu_item_clicked', data);
    // this.events.publish('profile_menu_item_clicked', data);
    // this.events.publish('newassignment_menu_item_clicked', data);


  }

  reportSubMenu(){
    if (this.submenuVisible) {
      this.submenuVisible = false;
    } else {
      this.submenuVisible = true;
    }
  }
}

