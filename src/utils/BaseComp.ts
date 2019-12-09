import {ToastController, LoadingController} from "ionic-angular";

export class BaseComp {

  BASE_URL = "http://14.98.208.123:8086/";
  IMAGE_BASE_URL = "http://127.0.0.1/dairy/uploads/";

  LOGIN_URL = this.BASE_URL + "api/servicesAPI/validateuser_mob";
  FARMER_DASHBOARD_URL = this.BASE_URL + "api/servicesAPI/getFarmerDashboardDetail";

  LOGIN_USER_ID = "LOGIN_USER_ID";
  LOGIN_USER_DATA = "LOGIN_USER_DATA";
  IS_LOGIN = "IS_LOGIN";

  presentToast(toastCtrl: ToastController, message: string) {
    let toast = toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  loadingComp(loadingCtrl: LoadingController) {
    let loading = loadingCtrl.create({
      content: 'Please wait...'
    });

    return loading;
  }

  saveItem(key, value) {
    window.localStorage.setItem(key, value);
  }

  getItem(key) {
    return window.localStorage.getItem(key);
  }

  // getUser() {
  //   try {
  //     if (window.localStorage.getItem(this.LOGIN_USER_DATA) != '') {
  //       // console.log("data:-"+this.getItem(this.LOGIN_USER_DATA));
  //       let parsedUser = JSON.parse(window.localStorage.getItem(this.LOGIN_USER_DATA));
  //
  //       let wallet:Wallet=null;
  //       if(parsedUser.wallet!=null){
  //         wallet = {
  //           wallet_id: parsedUser.wallet.wallet_id,
  //           user_id: parsedUser.wallet.user_id,
  //           balance: parsedUser.wallet.balance,
  //           updated_on: parsedUser.wallet.updated_on
  //         }
  //       }
  //
  //       let userAddress: UserAddress = null;
  //       if (parsedUser.user_address != null) {
  //         userAddress = {
  //           address_id: parsedUser.user_address.address_id,
  //           user_id: parsedUser.user_address.user_id,
  //           place_id: parsedUser.user_address.place_id,
  //           formatted_address: parsedUser.user_address.formatted_address,
  //           lat: parsedUser.user_address.lat,
  //           lng: parsedUser.user_address.lng,
  //           dairy_id: parsedUser.user_address.dairy_id,
  //         }
  //       }
  //
  //       const user: User = {
  //         user_id: parsedUser.user_id,
  //         user_name: parsedUser.user_name,
  //         phone: parsedUser.phone,
  //         email: parsedUser.email,
  //         device_token: parsedUser.device_token,
  //         device_type: parsedUser.device_type,
  //         registered_on: parsedUser.registered_on,
  //         wallet: wallet,
  //         user_address:userAddress
  //       }
  //
  //       return user;
  //     } else {
  //       return null;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }
  // }

  printKeyValuePairs(url: string, postdata) {
    console.log('url:-' + url);
    console.log('--------------FORM DATA---------------');
    let data = "";
    postdata.forEach((value, key) => {
      // console.log(key + ':' + value)
      data += key + ':' + value + "\n";
    });
    console.log(data);
    console.log('--------------FORM DATA---------------');
  }

  getCurrentDateYYYYMMDD() {
    var currentDate = new Date()
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var day_str = "";

    if (day < 10) {
      day_str = "0" + day;
    } else {
      day_str = "" + day;
    }

    var month_str = "";
    if (month < 10) {
      month_str = "0" + month;
    } else {
      month_str = "" + month;
    }
    let date_str = year + "-" + month_str + "-" + day_str;
    return date_str;
  }

  getDifferenceBtwTwoDates(date_str_1, date_str_2) {
    var date1 = new Date(date_str_1);
    var date2 = new Date(date_str_2);
    var Difference_In_Days = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
    return Difference_In_Days;
  }

  getOnlyDate(date) {
    return date.split(" ")[0];
  }
}
