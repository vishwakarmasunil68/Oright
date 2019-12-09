import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  MenuController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {DailyStatusPage} from "../daily-status/daily-status";
import {BaseComp} from "../../utils/BaseComp";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {HomeMessageProvider} from "../../providers/home-message/home-message";
import {LoginPage} from "../login/login";
import {FarmerPaymentPage} from "../farmer-payment/farmer-payment";
import {FarmerRecievePaymentPage} from "../farmer-recieve-payment/farmer-recieve-payment";
import {FarmerProfilePage} from "../farmer-profile/farmer-profile";

/**
 * Generated class for the FarmerDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farmer-dashboard',
  templateUrl: 'farmer-dashboard.html',
})
export class FarmerDashboardPage extends BaseComp {

  farmerArr: FarmerData[] = [];
  total_quantity: number = 0;
  total_price_due: number = 0;
  total_price: number = 0;

  milk_type: string = "0";

  selectedMonth = "2019-09";

  private subscriptions: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient,
              private toastCtrl: ToastController, private loadingCtrl: LoadingController, private menuCtrl: MenuController,
              private homeMessage: HomeMessageProvider,private alertCtrl:AlertController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmerDashboardPage');
    this.callFarmerAPI();
  }

  ionViewWillEnter() {
    this.subscriptions = this.homeMessage.getMessage().subscribe(message => {
      console.log("message:-" + message.data);
      this.menuCtrl.close();
      try {
        let value = message.data.toString();
        // console.log("value:-"+value);
        // if(value.split(",")[0]==window.localStorage.getItem("rand")){
        switch (value) {
          case "payments":
            this.navCtrl.push(FarmerPaymentPage);
            break;
          case "view_profile":
            this.navCtrl.push(FarmerProfilePage);
            break;
          case "change_password":
            this.changePassword();
            break;
          case "logout":
            this.saveItem(this.IS_LOGIN,"0");
            this.navCtrl.setRoot(LoginPage);
            break;
        }
      } catch (e) {
        console.log(e);
      }
    });
    console.log("ionic enter");
  }

  openMenu() {
    this.menuCtrl.open();
  }

  onDateChanged() {
    console.log("selected date:-" + this.selectedMonth);
    this.callFarmerAPI();
  }

  onMilkChange() {
    console.log("milk type:-" + this.milk_type);
  }

  openDailyReport(farmerData: FarmerData) {
    this.navCtrl.push(DailyStatusPage, {
      trench_id: farmerData.TranceID
    });
  }

  callFarmerAPI() {
    let loading = this.loadingComp(this.loadingCtrl);
    loading.present();

    // var url = this.FARMER_DASHBOARD_URL + "?farmerDashboard=[{FarmerId:" + this.getItem(this.LOGIN_USER_ID) + ",Month:9,Year:2019,MilkType:0}]";

    let month = this.selectedMonth.split("-")[1];

    if (((Number)(this.selectedMonth.split("-")[1])) < 10) {
      month = (this.selectedMonth.split("-")[1]).charAt(1);
    }


    var url = this.FARMER_DASHBOARD_URL + "?farmerDashboard=[{FarmerId:8,Month:" + month + ",Year:" + this.selectedMonth.split("-")[0] + ",MilkType:" + this.milk_type + "}]";
    // var url = this.LOGIN_URL+"?UserName="+this.email+"&Pword="+this.password;

    console.log("url:-" + url);

    let postData = new FormData();

    console.log("url:-" + url);

    this.http.post(url, postData).subscribe(result => {
      loading.dismiss();
      this.farmerArr = [];
      this.total_quantity = 0;
      this.total_price_due = 0;
      this.total_price = 0;
      try {
        console.log("data:-" + JSON.stringify(result));
        var parsedJSON = JSON.parse(JSON.stringify(result));

        for (let i = 0; i < parsedJSON.length; i++) {
          const farmerData: FarmerData = {
            FarmerId: parsedJSON[i].FarmerId,
            FarmerName: parsedJSON[i].FarmerName,
            Month: parsedJSON[i].Month,
            Year: parsedJSON[i].Year,
            MilkType: parsedJSON[i].MilkType,
            Quantity: parsedJSON[i].Quantity,
            Weighted_Avg_FAT: parsedJSON[i].Weighted_Avg_FAT,
            Weighted_Avg_SNF: parsedJSON[i].Weighted_Avg_SNF,
            Total_Amount_Due: parsedJSON[i].Total_Amount_Due,
            Trench_Details: parsedJSON[i].Trench_Details,
            TranceID: parsedJSON[i].TranceID,
            Start_Date: parsedJSON[i].Start_Date,
            End_Date: parsedJSON[i].End_Date,
            AmountPaid: parsedJSON[i].AmountPaid,
            ErrMsg: parsedJSON[i].ErrMsg,
            ErrMsgCode: parsedJSON[i].ErrMsgCode
          }

          this.total_quantity += (Number)(parsedJSON[i].Quantity);
          this.total_price_due += (Number)(parsedJSON[i].Total_Amount_Due);
          this.total_price += (Number)(parsedJSON[i].TotalPrice);

          this.farmerArr.push(farmerData);
        }

      } catch (err) {
        console.log(err);
      }
    })
  }

  payAmount(farmerData: FarmerData) {
    this.navCtrl.push(FarmerRecievePaymentPage, {
      data: farmerData
    });
  }

  changePassword() {
    let alert = this.alertCtrl.create({
      title: 'Change Password',
      inputs: [
        {
          name: 'old_password',
          placeholder: 'Old password',
          type: 'password'
        },
        {
          name: 'new_password',
          placeholder: 'New Password',
          type: 'password'
        },
        {
          name: 'confirm_password',
          placeholder: 'Confirm Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: data => {
            console.log("change password:-" + JSON.stringify(data));
            // if (data.new_password == data.confirm_password) {
            //   this.callChangePasswordAPI(data.new_password, data.confirm_password);
            // } else {
            //   this.presentToast("Password do not match");
            // }
            // // this.callChangePasswordAPI(data.);

          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  ionViewDidLeave(){
    console.log("ionic leave");
    this.subscriptions.unsubscribe();
  }

}

interface FarmerData {
  FarmerId: string;
  FarmerName: string;
  Month: string;
  Year: string;
  MilkType: string;
  Quantity: string;
  Weighted_Avg_FAT: string;
  Weighted_Avg_SNF: string;
  Total_Amount_Due: string;
  Trench_Details: string;
  TranceID: string;
  Start_Date: string;
  End_Date: string;
  AmountPaid: string;
  ErrMsg: string;
  ErrMsgCode: string;
}
