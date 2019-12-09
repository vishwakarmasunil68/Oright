import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {BaseComp} from "../../utils/BaseComp";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the FarmerRecievePaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farmer-recieve-payment',
  templateUrl: 'farmer-recieve-payment.html',
})
export class FarmerRecievePaymentPage extends BaseComp {

  farmerData: FarmerData;
  amount:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastController:ToastController,private loadingCtrl:LoadingController,private  http:HttpClient) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmerRecievePaymentPage');
    console.log("recieve data:-" + JSON.stringify(this.navParams.get("data")));
    this.farmerData = {
      FarmerId: this.navParams.get("data").FarmerId,
      FarmerName: this.navParams.get("data").FarmerName,
      Month: this.navParams.get("data").Month,
      Year: this.navParams.get("data").Year,
      MilkType: this.navParams.get("data").MilkType,
      Quantity: this.navParams.get("data").Quantity,
      Weighted_Avg_FAT: this.navParams.get("data").Weighted_Avg_FAT,
      Weighted_Avg_SNF: this.navParams.get("data").Weighted_Avg_SNF,
      Total_Amount_Due: this.navParams.get("data").Total_Amount_Due,
      Trench_Details: this.navParams.get("data").Trench_Details,
      TranceID: this.navParams.get("data").TranceID,
      Start_Date: this.navParams.get("data").Start_Date,
      End_Date: this.navParams.get("data").End_Date,
      AmountPaid: this.navParams.get("data").AmountPaid,
      ErrMsg: this.navParams.get("data").ErrMsg,
      ErrMsgCode: this.navParams.get("data").ErrMsgCode
    }
    this.amount=this.farmerData.Total_Amount_Due;
  }

  callPaymentRecieveAPI(){
    if(this.amount!=""){
      let loading = this.loadingComp(this.loadingCtrl);
      loading.present();

      var url = "http://14.98.208.123:8086/api/servicesAPI/PaymentReceived?PaymentReceivedDashboard=[{FarmerID:"+this.farmerData.FarmerId+",Month:"+this.farmerData.Month+",Year:"+this.farmerData.Year+",TranchID:"+this.farmerData.TranceID+",AmountPaid:"+this.amount+"}]";
      // var url = this.LOGIN_URL+"?UserName="+this.email+"&Pword="+this.password;

      console.log("url:-"+url);

      let postData = new FormData();

      console.log("url:-" + url);

      this.http.post(url, postData).subscribe(result => {
        loading.dismiss();
        try {
          console.log("data:-" + JSON.stringify(result));
          var parsedJSON = JSON.parse(JSON.stringify(result));

        } catch (err) {
          console.log(err);
        }
      })
    }else{
      this.presentToast(this.toastController,"Enter Proper Amount");
    }

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
