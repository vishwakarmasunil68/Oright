import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BaseComp} from "../../utils/BaseComp";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the FarmerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farmer-profile',
  templateUrl: 'farmer-profile.html',
})
export class FarmerProfilePage extends BaseComp {

  selected_farm: string;
  selected_cc: string;

  farmDetail_arr: FarmsDetails[] = [];
  collectionCenter_arr: CollectionCenter[] = [];
  farmerProfile: FarmerProfileData;

  first_name:string="";
  last_name:string="";
  phone:string="";
  aadhar_card:string="";
  pan_number:string="";
  cattle_cow:string="";
  calves_cow:string="";
  cattle_buffalo:string="";
  calves_buffalo:string="";
  cattle_desi:string="";
  calves_desi:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: HttpClient) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmerProfilePage');
    this.getFarms();

  }

  getFarms() {
    // let loading = this.loadingComp(this.loadingCtrl);
    // loading.present();

    // var url = this.FARMER_DASHBOARD_URL + "?farmerDashboard=[{FarmerId:" + this.getItem(this.LOGIN_USER_ID) + ",Month:9,Year:2019,MilkType:0}]";
    var url = "http://14.98.208.123:8086/api/DairyFarmApi/getAllDairyFarm?UserId=2";
    // var url = this.LOGIN_URL+"?UserName="+this.email+"&Pword="+this.password;

    let postData = new FormData();

    console.log("url:-" + url);

    this.http.get(url).subscribe(result => {
      this.farmDetail_arr = [];
      // loading.dismiss();
      try {
        console.log("data:-" + JSON.stringify(result));
        var parsedJSON = JSON.parse(JSON.stringify(result));
        for (let i = 0; i < parsedJSON.length; i++) {
          const farmDetail: FarmsDetails = {
            Farm_ID: parsedJSON[i].Farm_ID,
            Farm_Name: parsedJSON[i].Farm_Name,
            Comany_Name: parsedJSON[i].Comany_Name,
            Address: parsedJSON[i].Address,
            Zip_Code: parsedJSON[i].Zip_Code,
            City_ID: parsedJSON[i].City_ID,
            State_ID: parsedJSON[i].State_ID,
            Country_ID: parsedJSON[i].Country_ID,
            Owner_Name: parsedJSON[i].Owner_Name,
            Contact_Person: parsedJSON[i].Contact_Person
          }
          this.farmDetail_arr.push(farmDetail);
          this.getCollectionCenters();

        }

      } catch (err) {
        console.log(err);
      }
    })
  }

  getCollectionCenters() {
    // let loading = this.loadingComp(this.loadingCtrl);
    // loading.present();

    // var url = this.FARMER_DASHBOARD_URL + "?farmerDashboard=[{FarmerId:" + this.getItem(this.LOGIN_USER_ID) + ",Month:9,Year:2019,MilkType:0}]";
    var url = "http://14.98.208.123:8086/api/CollectionCentreApi/getAllCollectionCentre?UserId=2";
    // var url = this.LOGIN_URL+"?UserName="+this.email+"&Pword="+this.password;

    let postData = new FormData();

    console.log("url:-" + url);

    this.http.get(url).subscribe(result => {
      this.collectionCenter_arr = [];
      // loading.dismiss();
      try {
        console.log("data:-" + JSON.stringify(result));
        var parsedJSON = JSON.parse(JSON.stringify(result));
        for (let i = 0; i < parsedJSON.length; i++) {
          const collectionCenter: CollectionCenter = {
            CollectionCentre_ID: parsedJSON[i].CollectionCentre_ID,
            CollectionCentre_Name: parsedJSON[i].CollectionCentre_Name,
            PCollectionCentre_ID: parsedJSON[i].PCollectionCentre_ID,
            CollectionCentre_Type: parsedJSON[i].CollectionCentre_Type,
            Farm_ID: parsedJSON[i].Farm_ID,
            Address: parsedJSON[i].Address,
            Zip_Code: parsedJSON[i].Zip_Code,
            City_ID: parsedJSON[i].City_ID,
            Owner_ID: parsedJSON[i].Owner_ID,
            SupervisorName: parsedJSON[i].SupervisorName,
            Modified_By: parsedJSON[i].Modified_By,
            Modified_On: parsedJSON[i].Modified_On,
            City_Name: parsedJSON[i].City_Name,
            Owner_Name: parsedJSON[i].Owner_Name
          }
          this.collectionCenter_arr.push(collectionCenter);
          this.getFarmerProfile();
        }

      } catch (err) {
        console.log(err);
      }
    })
  }

  getFarmerProfile() {
    let loading = this.loadingComp(this.loadingCtrl);
    loading.present();

    var url = "http://14.98.208.123:8086/api/FarmerApi/getFarmerById?Farmer_ID=[{Farmer_ID:10}]";

    let postData = new FormData();

    console.log("url:-" + url);

    this.http.get(url).subscribe(result => {
      loading.dismiss();
      try {
        console.log("data:-" + JSON.stringify(result));
        var parsedJSON = JSON.parse(JSON.stringify(result));
        this.farmerProfile = {
          Farmer_ID: parsedJSON[0].Farmer_ID,
          AccountName: parsedJSON[0].AccountName,
          FirstName: parsedJSON[0].FirstName,
          MiddleName: parsedJSON[0].MiddleName,
          LastName: parsedJSON[0].LastName,
          Location_ID: parsedJSON[0].Location_ID,
          Phone: parsedJSON[0].Phone,
          PAN: parsedJSON[0].PAN,
          RFID: parsedJSON[0].RFID,
          Aadhar: parsedJSON[0].Aadhar,
          Active: parsedJSON[0].Active,
          CreatedByUserID: parsedJSON[0].CreatedByUserID,
          CreatedDate: parsedJSON[0].CreatedDate,
          ModifiedByUserID: parsedJSON[0].ModifiedByUserID,
          ModifiedDate: parsedJSON[0].ModifiedDate,
          Farm_ID: parsedJSON[0].Farm_ID,
          Farm_Name: parsedJSON[0].Farm_Name,
          CollectionCentre_ID: parsedJSON[0].CollectionCentre_ID,
          CollectionCentre_Name: parsedJSON[0].CollectionCentre_Name,
          CattleCowNo: parsedJSON[0].CattleCowNo,
          CalvesCowNo: parsedJSON[0].CalvesCowNo,
          CattleBuffaloNo: parsedJSON[0].CattleBuffaloNo,
          CalvesBuffaloNo: parsedJSON[0].CalvesBuffaloNo,
          CattleDesiCowNo: parsedJSON[0].CattleDesiCowNo,
          CalvesDesiCowNo: parsedJSON[0].CalvesDesiCowNo
        }

        // let cattle_count=(((Number)(this.farmerProfile.CattleBuffaloNo))+((Number)(this.farmerProfile.CalvesCowNo))+((Number)(this.farmerProfile.CattleDesiCowNo)));
        // let calves_count=(((Number)(this.farmerProfile.CalvesBuffaloNo))+((Number)(this.farmerProfile.CalvesCowNo))+((Number)(this.farmerProfile.CalvesDesiCowNo)));
        // let cow_count=(((Number)(this.farmerProfile.CattleCowNo))+((Number)(this.farmerProfile.CalvesCowNo)));
        // let buffalo_count=(((Number)(this.farmerProfile.CattleBuffaloNo))+((Number)(this.farmerProfile.CalvesBuffaloNo)));
        // let desi_count=(((Number)(this.farmerProfile.CattleDesiCowNo))+((Number)(this.farmerProfile.CalvesDesiCowNo)));


        this.first_name=this.farmerProfile.FirstName;
        this.last_name=this.farmerProfile.LastName;
        this.phone=this.farmerProfile.Phone;
        this.aadhar_card=this.farmerProfile.Aadhar;
        this.pan_number=this.farmerProfile.PAN;
        this.cattle_cow=this.farmerProfile.CattleCowNo;
        this.calves_cow=this.farmerProfile.CalvesCowNo;
        this.cattle_buffalo=this.farmerProfile.CattleBuffaloNo;
        this.calves_buffalo=this.farmerProfile.CalvesBuffaloNo;
        this.cattle_desi=this.farmerProfile.CattleDesiCowNo;
        this.calves_desi=this.farmerProfile.CalvesDesiCowNo;

        this.selected_farm=this.farmerProfile.Farm_ID;
        this.selected_cc=this.farmerProfile.CollectionCentre_ID;

      } catch (err) {
        console.log(err);
      }
    })
  }

  updateProfile(){
    let loading = this.loadingComp(this.loadingCtrl);
    loading.present();

    let uploadData=[];
    uploadData.push({
      Farmer_ID:this.farmerProfile.Farmer_ID,
      AccountName: this.farmerProfile.AccountName,
      FirstName: this.first_name,
      MiddleName: "",
      LastName: this.last_name,
      Location_ID: 0,
      Phone: this.phone,
      PAN: this.pan_number,
      RFID: "",
      Aadhar: this.aadhar_card,
      Active: 0,
      CreatedByUserID: 0,
      CreatedDate: null,
      ModifiedByUserID: 0,
      ModifiedDate: null,
      Farm_ID: this.selected_farm,
      Farm_Name: "",
      CollectionCentre_ID: this.selected_cc,
      CollectionCentre_Name: "",
      CattleCowNo: this.cattle_cow,
      CalvesCowNo: this.calves_cow,
      CattleBuffaloNo: this.cattle_buffalo,
      CalvesBuffaloNo: this.calves_buffalo,
      CattleDesiCowNo: this.cattle_desi,
      CalvesDesiCowNo: this.calves_desi
    });

    console.log("update data:-"+uploadData)

    var url = "http://14.98.208.123:8086/api/FarmerApi/updateFarmer?FarmerDetail="+JSON.stringify(uploadData);

    let postData = new FormData();

    console.log("url:-" + url);

    this.http.post(url,postData).subscribe(result => {
      this.collectionCenter_arr = [];
      loading.dismiss();
      try {
        console.log("data:-" + JSON.stringify(result));

      } catch (err) {
        console.log(err);
      }
    })
  }


}


interface FarmsDetails {
  Farm_ID: string;
  Farm_Name: string;
  Comany_Name: string;
  Address: string;
  Zip_Code: string;
  City_ID: string;
  State_ID: string;
  Country_ID: string;
  Owner_Name: string;
  Contact_Person: string;
}

interface CollectionCenter {
  CollectionCentre_ID: string;
  CollectionCentre_Name: string;
  PCollectionCentre_ID: string;
  CollectionCentre_Type: string;
  Farm_ID: string;
  Address: string;
  Zip_Code: string;
  City_ID: string;
  Owner_ID: string;
  SupervisorName: string;
  Modified_By: string;
  Modified_On: string;
  City_Name: string;
  Owner_Name: string;
}

interface FarmerProfileData {
  Farmer_ID: string;
  AccountName: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Location_ID: string;
  Phone: string;
  PAN: string;
  RFID: string;
  Aadhar: string;
  Active: string;
  CreatedByUserID: string;
  CreatedDate: string;
  ModifiedByUserID: string;
  ModifiedDate: string;
  Farm_ID: string;
  Farm_Name: string;
  CollectionCentre_ID: string;
  CollectionCentre_Name: string;
  CattleCowNo: string;
  CalvesCowNo: string;
  CattleBuffaloNo: string;
  CalvesBuffaloNo: string;
  CattleDesiCowNo: string;
  CalvesDesiCowNo: string;
}
