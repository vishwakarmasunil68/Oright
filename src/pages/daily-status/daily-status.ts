import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BaseComp} from "../../utils/BaseComp";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the DailyStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-status',
  templateUrl: 'daily-status.html',
})
export class DailyStatusPage extends BaseComp {
  dates: DailyStatus[] = [];

  tranch_id: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: HttpClient) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyStatusPage');

    this.tranch_id = this.navParams.get("trench_id");
    this.callFarmerAPI();

  }


  callFarmerAPI() {
    let loading = this.loadingComp(this.loadingCtrl);
    loading.present();

    // var url = this.FARMER_DASHBOARD_URL + "?farmerDashboard=[{FarmerId:" + this.getItem(this.LOGIN_USER_ID) + ",Month:9,Year:2019,MilkType:0}]";
    var url = "http://14.98.208.123:8086/api/servicesAPI/getPaymentTranchFarmerDashboardDetail?paymentTranchDetailDashboard=[{FarmerId:8,Month:9,Year:2019,TranchID:1}]";
    // var url = this.LOGIN_URL+"?UserName="+this.email+"&Pword="+this.password;

    let postData = new FormData();

    console.log("url:-" + url);

    this.http.post(url, postData).subscribe(result => {
      loading.dismiss();
      this.dates = [];
      try {
        console.log("data:-" + JSON.stringify(result));
        var parsedJSON = JSON.parse(JSON.stringify(result));

        for (let i = 0; i < parsedJSON.length; i++) {
          const dailyStatus: DailyStatus = {
            Start_Date: parsedJSON[i].Start_Date,
            End_Date: parsedJSON[i].End_Date,
            Dates: parsedJSON[i].Dates,
            MilkType: parsedJSON[i].MilkType,
            Amount_Due: parsedJSON[i].Amount_Due,
            AmountPaid: parsedJSON[i].AmountPaid,
            TotalQuantity: parsedJSON[i].TotalQuantity,
            TranchID: parsedJSON[i].TranchID,
            Quantity: parsedJSON[i].Quantity,
            ErrMsg: parsedJSON[i].ErrMsg,
            ErrMsgCode: parsedJSON[i].ErrMsgCode,
            Weighted_Avg_FAT: parsedJSON[i].Weighted_Avg_FAT,
            Weighted_Avg_SNF: parsedJSON[i].Weighted_Avg_SNF,
            Volume: parsedJSON[i].Volume,
            FarmerID: parsedJSON[i].FarmerID,
            Month: parsedJSON[i].Month,
            Year: parsedJSON[i].Year,
            CollectionCentreID: parsedJSON[i].CollectionCentreID,
            Trench_CCID: parsedJSON[i].Trench_CCID,
            TrancheTransID: parsedJSON[i].TrancheTransID,
            payment_Date: parsedJSON[i].payment_Date
          }
          this.dates.push(dailyStatus);
        }

        for(let i=0;i<this.dates.length;i++){
          console.log("date:-"+this.dates[i].Dates);
        }

      } catch (err) {
        console.log(err);
      }
    })
  }

}

interface DailyStatus {
  Start_Date: string;
  End_Date: string;
  Dates: string;
  MilkType: string;
  Amount_Due: string;
  AmountPaid: string;
  TotalQuantity: string;
  TranchID: string;
  Quantity: string;
  ErrMsg: string;
  ErrMsgCode: string;
  Weighted_Avg_FAT: string;
  Weighted_Avg_SNF: string;
  Volume: string;
  FarmerID: string;
  Month: string;
  Year: string;
  CollectionCentreID: string;
  Trench_CCID: string;
  TrancheTransID: string;
  payment_Date: string;
}
