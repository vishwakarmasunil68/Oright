import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from "chart.js";
import {BaseComp} from "../../utils/BaseComp";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the MilkVolumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-milk-volume',
  templateUrl: 'milk-volume.html',
})
export class MilkVolumePage extends BaseComp{

  @ViewChild("barCanvas") barCanvas: ElementRef;
  // @ViewChild("groupbarcanvas") groupbarcanvas: ElementRef;
  // @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  // @ViewChild("lineCanvas") lineCanvas: ElementRef;

  private barChart: Chart;
  private groupBarChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;


  BAR_YEARLY = "BAR_YEARLY";
  BAR_MONTHLY = "BAR_MONTHLY";
  BAR_QUATERLY = "BAR_QUATERLY";
  BAR_DAILY = "BAR_DAILY";

  BAR_PERIOD_TYPE = this.BAR_YEARLY;

  is_visible = true;

  selected_year = "2019";

  backGroundColor: string[] = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)"
  ];

  bordeColor: string[] = [
    "rgba(255,99,132,1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255,99,132,1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)"
  ];

  years: string[] = [];
  quaters: string[] = [];
  months: string[] = [];
  types: string[] = [];
  dairyData: DairyData[] = [];

  selected_type: string = "";
  selected_quater: string = "";
  selected_month: string = "";
  selected_time: string = "2019-09-25";

  is_year = false;
  is_quater = false;
  is_month = false;
  is_daily = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.types.push("Yearly");
    this.types.push("Quaterly");
    this.types.push("Monthly");
    this.types.push("Daily");

    this.quaters.push("Jan-Apr");
    this.quaters.push("May-Aug");
    this.quaters.push("Sep-Dec");

    this.months.push("January");
    this.months.push("Feburary");
    this.months.push("March");
    this.months.push("April");
    this.months.push("May");
    this.months.push("June");
    this.months.push("July");
    this.months.push("August");
    this.months.push("September");
    this.months.push("October");
    this.months.push("November");
    this.months.push("December");


    this.selected_type = this.types[0];

    this.getBarData();
  }

  onQuaterSelected() {
    console.log("selected year:-" + this.selected_quater);
    let dairyData: DairyData = null;
    for (let i = 0; i < this.dairyData.length; i++) {
      if (this.dairyData[i].year == this.selected_year) {
        dairyData = this.dairyData[i];
      }
    }
    if (dairyData != null) {
      let labels = [];
      let data = [];
      let backgroundColors = [];
      let borderColors = [];

      labels.push("Jan-Apr");
      labels.push("May-Aug");
      labels.push("Sept-Dec");


      for (let i = 0; i < 3; i++) {
        data.push(this.getRandomInt(1, 50));
        backgroundColors.push(this.backGroundColor[i]);
        borderColors.push(this.backGroundColor[i]);
      }
      this.BAR_PERIOD_TYPE = this.BAR_QUATERLY;
      this.showBarChartDataset("Dairy Quaterly data", labels, data, backgroundColors, borderColors);
    }
  }

  dateChanged() {
    console.log("selected year:-" + this.selected_time);
    let dairyData: DairyData = null;
    for (let i = 0; i < this.dairyData.length; i++) {
      if (this.dairyData[i].year == this.selected_year) {
        dairyData = this.dairyData[i];
      }
    }

    if (dairyData != null) {

      let labels = [];
      let data = [];
      let backgroundColors = [];
      let borderColors = [];

      for (let i = 0; i < dairyData.yearData.length; i++) {
        labels.push(dairyData.yearData[i].name);
        data.push(dairyData.yearData[i].value);
        backgroundColors.push(this.backGroundColor[i]);
        borderColors.push(this.backGroundColor[i]);
      }
      this.BAR_PERIOD_TYPE = this.BAR_DAILY;
      this.showBarChartDataset("Dairy Daily Data", labels, data, backgroundColors, borderColors);
    }
  }

  onMonthSelected() {
    console.log("selected year:-" + this.selected_month);
    let dairyData: DairyData = null;
    for (let i = 0; i < this.dairyData.length; i++) {
      if (this.dairyData[i].year == this.selected_year) {
        dairyData = this.dairyData[i];
      }
    }

    if (dairyData != null) {

      let labels = [];
      let data = [];
      let backgroundColors = [];
      let borderColors = [];

      // labels.push("")

      for (let i = 0; i < dairyData.yearData.length; i++) {
        // labels.push(dairyData.yearData[i].name);
        data.push(dairyData.yearData[i].value);
        backgroundColors.push(this.backGroundColor[i]);
        borderColors.push(this.backGroundColor[i]);
      }
      for (let i = 0; i < 4; i++) {
        // labels.push(dairyData.yearData[i].name);
        data.push(dairyData.yearData[i].value);
        backgroundColors.push(this.backGroundColor[i]);
        borderColors.push(this.backGroundColor[i]);
      }
      this.BAR_PERIOD_TYPE = this.BAR_MONTHLY;
      this.showBarChartDataset("Dairy Monthly Data", this.months, data, backgroundColors, borderColors);
    }
  }

  onYearSelected() {
    console.log("selected year:-" + this.selected_year);
    let dairyData: DairyData = null;
    for (let i = 0; i < this.dairyData.length; i++) {
      if (this.dairyData[i].year == this.selected_year) {
        dairyData = this.dairyData[i];
      }
    }

    if (dairyData != null) {

      let labels = [];
      let data = [];
      let backgroundColors = [];
      let borderColors = [];

      for (let i = 0; i < dairyData.yearData.length; i++) {
        labels.push(dairyData.yearData[i].name);
        data.push(dairyData.yearData[i].value);
        backgroundColors.push(this.backGroundColor[i]);
        borderColors.push(this.backGroundColor[i]);
      }

      this.BAR_PERIOD_TYPE = this.BAR_YEARLY;
      this.showBarChartDataset("Dairy Yearly Data", labels, data, backgroundColors, borderColors);
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getBarData() {

    // this.http.get('../assets/data/cards.json').map(res => res.json()).subscribe(data =>
    // {
    //   console.log(data);
    // });

    this.http.get('assets/data/Dairyyear.json').subscribe(result => {
      this.years = [];
      this.dairyData = [];
      try {
        // console.log("data:-" + JSON.parse(JSON.stringify(result)));
        let jsonResult = JSON.parse(JSON.stringify(result));
        // let jsonResult=result;
        // console.log("json:-" + jsonResult);
        for (let i = 0; i < jsonResult.length; i++) {
          this.years.push(jsonResult[i].year);
          let yearData: YearData[] = [];
          for (let j = 0; j < jsonResult[i].data.length; j++) {
            const yearDataConst: YearData = {
              name: jsonResult[i].data[j].name,
              value: jsonResult[i].data[j].value
            }
            yearData.push(yearDataConst);
          }
          let quaterData: Quaterly[] = [];
          for (let j = 0; j < jsonResult[i].quaterly.length; j++) {
            const quaterly: Quaterly = {
              name: jsonResult[i].quaterly[j].name,
              value: jsonResult[i].quaterly[j].value
            }
            quaterData.push(quaterly);
          }
          const dairyData: DairyData = {
            year: jsonResult[i].year,
            yearData: yearData,
            quaterly: quaterData
          }
          this.dairyData.push(dairyData);
        }

        if (this.dairyData.length > 0) {
          this.selected_year = this.dairyData[0].year;
          this.onYearSelected();
        }
      } catch (err) {
        console.log(err);
      }
    })
  }

  onTypeSelected() {
    console.log("selected type:-" + this.selected_type);
    if (this.selected_type == "Yearly") {

      this.is_year = true;
      this.is_month = false;
      this.is_quater = false;
      this.is_daily = false;
      this.onYearSelected();

    } else if (this.selected_type == "Quaterly") {

      this.is_year = false;
      this.is_month = false;
      this.is_quater = true;
      this.is_daily = false;

      this.onQuaterSelected();
    } else if (this.selected_type == "Monthly") {

      this.is_year = false;
      this.is_month = true;
      this.is_quater = false;
      this.is_daily = false;

      this.onMonthSelected();
    } else if (this.selected_type == "Daily") {

      this.is_year = false;
      this.is_month = false;
      this.is_quater = false;
      this.is_daily = true;

      this.onYearSelected();
    }
  }

  showBarChartDataset(title, labels, data, backgroundColors, borderColors) {
    console.log("showing bar chart dataset");
    console.log("labels:-" + JSON.stringify(labels));
    console.log("data:-" + JSON.stringify(data));
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.barCanvas.nativeElement.addEventListener('click', (evt) => {
      console.log("bar chart clicked:-"+this.BAR_PERIOD_TYPE);
      switch (this.BAR_PERIOD_TYPE) {
        case this.BAR_YEARLY:
          // this.onQuaterSelected();
          this.selected_type=this.types[1];
          break;
        case this.BAR_QUATERLY:
          // this.onMonthSelected();
          this.selected_type=this.types[2];
          break;
        case this.BAR_MONTHLY:
          // this.dateChanged();
          this.selected_type=this.types[3];
          break;
        case this.BAR_DAILY:
          break;
      }
    }, false);
  }


  chartClicked(e: any): void {
    console.log("chart clicked");
    if (!e.active.length) return; //return if not clicked on chart/slice
    alert('Clicked on Chart!');
  }

}

interface DairyData {
  year: string;
  yearData: YearData[];
  quaterly: Quaterly[];
}

interface YearData {
  name: string;
  value: string;
}

interface Quaterly {
  name: string;
  value: string;
}

