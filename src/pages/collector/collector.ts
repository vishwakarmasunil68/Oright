import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CollectorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collector',
  templateUrl: 'collector.html',
})
export class CollectorPage {

  milk_type:string="";

  progress_quantity=45;
  progress_fat=90;
  progress_snf=80;
  progress_farmers=20;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CcDashboardPage');
  }

}
