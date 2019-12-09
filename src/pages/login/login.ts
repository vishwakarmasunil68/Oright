import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {BaseComp} from "../../utils/BaseComp";
import {HttpClient} from "@angular/common/http";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {FarmerDashboardPage} from "../farmer-dashboard/farmer-dashboard";
import {CollectorPage} from "../collector/collector";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseComp {

  email: string = "";
  password: string = "";
  password_type: string = "password";
  showPass: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController, private http: HttpClient) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage).then(res => {
      // this.navCtrl.pop();
      // this.navCtrl.push(HomePage);
    });
  }

  callLoginAPI() {

    // if(window.localStorage.getItem("is_farmer")=="1"){
    //   window.localStorage.setItem("is_farmer","0");
    //   this.navCtrl.push(FarmerDashboardPage);
    // }else{
    //   window.localStorage.setItem("is_farmer","1");
    //   this.navCtrl.push(CollectorPage);
    // }

    // this.navCtrl.setRoot(FarmerDashboardPage);

    // this.navCtrl.setRoot(HomePage);


    if (this.email != '' || this.password != '') {
      let loading = this.loadingComp(this.loadingCtrl);
      loading.present();

      var url = this.LOGIN_URL + "?UserName=" + this.email + "&pword=" + this.password;
      // var url = this.LOGIN_URL+"?UserName="+this.email+"&Pword="+this.password;

      let postData = new FormData();

      console.log("url:-" + url);

      this.http.post(url, postData).subscribe(result => {
        loading.dismiss();
        try {
          console.log("data:-" + JSON.stringify(result));
          var parsedJSON = JSON.parse(JSON.stringify(result));

            if(parsedJSON[0].ErrMsgCode=="0"){
              this.saveItem(this.LOGIN_USER_DATA, JSON.stringify(result));
              this.saveItem(this.LOGIN_USER_ID, parsedJSON[0].UserFarmerId);
              this.saveItem(this.IS_LOGIN, "1");
              this.navCtrl.setRoot(FarmerDashboardPage);
            }else{
              this.presentToast(this.toastCtrl,"Invalid Login");
            }



        } catch (err) {
          console.log(err);
        }
      })
    } else {
      this.presentToast(this.toastCtrl, "Please enter fields properly");
    }
  }

  forgotPassword(): void {
    this.navCtrl.push(ForgotPasswordPage);
  }

  showHide(): void {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.password_type = 'text';
    } else {
      this.password_type = 'password';
    }
  }

}
