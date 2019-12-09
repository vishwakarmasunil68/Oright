import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";

/**
 * Generated class for the LandingScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing-screen',
  templateUrl: 'landing-screen.html',
})
export class LandingScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingScreenPage');
  }

  openLogin() {
    this.navCtrl.push(LoginPage);
  }

}
