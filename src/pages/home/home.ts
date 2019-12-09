import {Component, ElementRef, ViewChild} from '@angular/core';
import {Events, MenuController, NavController} from 'ionic-angular';
import {Chart} from "chart.js";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  images: string[] = [];

  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("groupbarcanvas") groupbarcanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

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


  constructor(public navCtrl: NavController, private menuCtrl: MenuController,private events:Events,private http:HttpClient) {
    this.images.push("assets/imgs/banner1.jpg");
    this.images.push("assets/imgs/banner2.jpg");
    this.images.push("assets/imgs/banner3.jpg");
    // setTimeout(() => {
    //   this.ionViewDidLoad();
    // }, 1000);

    events.subscribe('tab_clicked', (data) => {
      console.log("tab_clicked:-" + data);
      this.menuCtrl.close();
      switch (data) {

      }
    });



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

    this.loadGraphs();
    this.getBarData();
    this.groupbarDataSet();
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


  groupbarDataSet() {
    console.log("showing bar chart dataset");
    this.groupBarChart = new Chart(this.groupbarcanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["08:00", "10:00", "12:00","14:00","16:00"],
        datasets: [
          {
            label: "Dairy1",
            backgroundColor: this.backGroundColor[0],
            borderColor: this.bordeColor[0],
            borderWidth: 1,
            data: [3,7,4,5,6]
          },
          {
            label: "Dairy2",
            backgroundColor: this.backGroundColor[1],
            borderColor: this.bordeColor[1],
            borderWidth: 1,
            data: [4,3,5,2,4]
          },
          {
            label: "Dairy3",
            backgroundColor: this.backGroundColor[2],
            borderColor: this.bordeColor[2],
            borderWidth: 1,
            data: [7,2,6,6,2]
          },
          // {
          //   label: "Dairy4",
          //   backgroundColor: this.backGroundColor[3],
          //   borderColor: this.bordeColor[3],
          //   borderWidth: 1,
          //   data: [2,3,4]
          // },
          // {
          //   label: "Dairy5",
          //   backgroundColor: this.backGroundColor[4],
          //   borderColor: this.bordeColor[4],
          //   borderWidth: 1,
          //   data: [5,6,7]
          // }
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

  }


  loadGraphs() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["CASO", "AMSU", "DETERGENT", "UREA", "SALT"],
        datasets: [
          {
            label: "Total Adultarent",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false
          }
        ]
      }
    });
  }

  chartClicked(e: any): void {
    console.log("chart clicked");
    if (!e.active.length) return; //return if not clicked on chart/slice
    alert('Clicked on Chart!');
  }

  openMenu() {
    this.menuCtrl.open();
  }

  openNotifications() {

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
