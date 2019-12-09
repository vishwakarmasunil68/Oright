import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BaseComp} from "../../utils/BaseComp";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the FarmerPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farmer-payment',
  templateUrl: 'farmer-payment.html',
})
export class FarmerPaymentPage extends BaseComp {

  paymentDetails: PaymentDetail[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: HttpClient) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmerPaymentPage');
    this.callFarmerAPI();
  }

  callFarmerAPI() {
    let loading = this.loadingComp(this.loadingCtrl);
    loading.present();

    // var url = this.FARMER_DASHBOARD_URL + "?farmerDashboard=[{FarmerId:" + this.getItem(this.LOGIN_USER_ID) + ",Month:9,Year:2019,MilkType:0}]";
    var url = "http://14.98.208.123:8086/api/servicesAPI/PaymentReportFarmer?PaymentReportFarmerDashboard=[{FarmerID:8,Month:9,Year:2019}]";
    // var url = this.LOGIN_URL+"?UserName="+this.email+"&Pword="+this.password;

    let postData = new FormData();

    console.log("url:-" + url);

    this.http.post(url, postData).subscribe(result => {
      loading.dismiss();
      this.paymentDetails = [];
      try {
        console.log("data:-" + JSON.stringify(result));
        var parsedJSON = JSON.parse(JSON.stringify(result));

        for (let i = 0; i < parsedJSON.length; i++) {
          const paymentDetail: PaymentDetail = {
            Start_Date: parsedJSON[i].Start_Date,
            End_Date: parsedJSON[i].End_Date,
            Dates: parsedJSON[i].Dates,
            MilkType: parsedJSON[i].MilkType,
            Amount_Due: parsedJSON[i].Amount_Due,
            AmountPaid: parsedJSON[i].AmountPaid,
            TotalQuantity: parsedJSON[i].TotalQuantity,
            Quantity: parsedJSON[i].Quantity,
            Volume: parsedJSON[i].Volume,
            FarmerID: parsedJSON[i].FarmerID,
            Month: parsedJSON[i].Month,
            Year: parsedJSON[i].Year,
            Amount_to_Paid: parsedJSON[i].Amount_to_Paid,
            FarmerName: parsedJSON[i].FarmerName,
            FarmerNumber: parsedJSON[i].FarmerNumber
          }
          this.paymentDetails.push(paymentDetail);
        }

      } catch (err) {
        console.log(err);
      }
    })
  }

}

interface PaymentDetail {
  Start_Date: string;
  End_Date: string;
  Dates: string;
  MilkType: string;
  Amount_Due: string;
  AmountPaid: string;
  TotalQuantity: string;
  Quantity: string;
  Volume: string;
  FarmerID: string;
  Month: string;
  Year: string;
  Amount_to_Paid: string;
  FarmerName: string;
  FarmerNumber: string;
}
