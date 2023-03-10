type Virus = {
  name: string;
  description: string;
  points: Array<{ date: string, value: number }>;
}

type Viruses = Virus[]

export type VirusesResponse = {
  viruses: Viruses
}

export const data: VirusesResponse = {
  viruses: [
    {
      name: 'Influenza',
      description: 'Chart showing the weekly incidence per 100,000 population of Flu in England',
      points: 
        [{
          date: "2022-01-10",
          value: 0.504229017566688
        }, {
          date: "2022-01-17",
          value: 0.457902511078287
        }, {
          date: "2022-01-24",
          value: 0.356217616580311
        }, {
          date: "2022-01-31",
          value: 0.447343895619758
        }, {
          date: "2022-02-07",
          value: 0.388681592039801
        }, {
          date: "2022-02-14",
          value: 0.565291124929339
        }, {
          date: "2022-02-21",
          value: 0.817361894024803
        }, {
          date: "2022-02-28",
          value: 1.11988513998564
        }, {
          date: "2022-03-07",
          value: 1.55293414961923
        }, {
          date: "2022-03-14",
          value: 1.99309061918682
        }, {
          date: "2022-03-21",
          value: 2.78770550393138
        }, {
          date: "2022-03-28",
          value: 3.82411916356345
        }, {
          date: "2022-04-04",
          value: 4.28420576255846
        }, {
          date: "2022-04-11",
          value: 5.37827715355805
        }, {
          date: "2022-04-18",
          value: 3.88281469021587
        }, {
          date: "2022-04-25",
          value: 2.85028502850285
        }, {
          date: "2022-05-02",
          value: 2.53512522907758
        }, {
          date: "2022-05-09",
          value: 2.10196779964222
        }, {
          date: "2022-05-16",
          value: 1.80244110133409
        }, {
          date: "2022-05-23",
          value: 1.2277388019428
        }, {
          date: "2022-05-30",
          value: 0.830029732408325
        }, {
          date: "2022-06-06",
          value: 0.950759188307081
        }, {
          date: "2022-06-13",
          value: 1.07638438594216
        }, {
          date: "2022-06-20",
          value: 0.535457751077446
        }, {
          date: "2022-06-27",
          value: 0.526161940952938
        }, {
          date: "2022-07-04",
          value: 0.454132606721163
        }, {
          date: "2022-07-11",
          value: 0.657250734163054
        }, {
          date: "2022-07-18",
          value: 1.18962645729241
        }, {
          date: "2022-07-25",
          value: 0.569620253164557
        }, {
          date: "2022-08-01",
          value: 0.531208499335989
        }, {
          date: "2022-08-08",
          value: 0.727272727272727
        }, {
          date: "2022-08-15",
          value: 1.5625
        }, {
          date: "2022-08-22",
          value: 0.890782339271882
        }, {
          date: "2022-08-29",
          value: 0.552120141342756
        }, {
          date: "2022-09-05",
          value: 1.14093959731544
        }, {
          date: "2022-09-12",
          value: 2.33644859813084
        }, {
          date: "2022-09-19",
          value: 3.31425846447306
        }, {
          date: "2022-09-26",
          value: 2.55464840663682
        }, {
          date: "2022-10-03",
          value: 3.26418547895058
        }, {
          date: "2022-10-10",
          value: 4.47570332480818
        }, {
          date: "2022-10-17",
          value: 5.85086747877446
        }, {
          date: "2022-10-24",
          value: 6.21781422849514
        }, {
          date: "2022-10-31",
          value: 7.62555391432792
        }, {
          date: "2022-11-07",
          value: 8.29459261071691
        }, {
          date: "2022-11-14",
          value: 9.33561204870754
        }, {
          date: "2022-11-21",
          value: 9.89789196310936
        }, {
          date: "2022-11-28",
          value: 12.654130702836
        }, {
          date: "2022-12-05",
          value: 17.2824585635359
        }, {
          date: "2022-12-12",
          value: 23.4789777411377
        }, {
          date: "2022-12-19",
          value: 29.9649773382777
        }, {
          date: "2022-12-26",
          value: 31.6485864562788
        }, {
          date: "2023-01-02",
          value: 27.0298143633977
        }]
    },
    {
      name: 'RSV',
      description: "Chart showing the weekly incidence per 100,000 population of RSV in England",
      points: [{
        date: "2022-01-10",
        value: 33388
      }, {
        date: "2022-01-17",
        value: 29214
      }, {
        date: "2022-01-24",
        value: 24036
      }, {
        date: "2022-01-31",
        value: 18018
      }, {
        date: "2022-02-07",
        value: 16197
      }, {
        date: "2022-02-14",
        value: 19252
      }, {
        date: "2022-02-21",
        value: 26659
      }, {
        date: "2022-02-28",
        value: 34501
      }, {
        date: "2022-03-07",
        value: 38016
      }, {
        date: "2022-03-14",
        value: 36779
      }, {
        date: "2022-03-21",
        value: 31662
      }, {
        date: "2022-03-28",
        value: 22925
      }, {
        date: "2022-04-04",
        value: 17914
      }, {
        date: "2022-04-11",
        value: 12377
      }, {
        date: "2022-04-18",
        value: 10590
      }, {
        date: "2022-04-25",
        value: 9005
      }, {
        date: "2022-05-02",
        value: 7894
      }, {
        date: "2022-05-09",
        value: 7050
      }, {
        date: "2022-05-16",
        value: 7896
      }, {
        date: "2022-05-23",
        value: 10824
      }, {
        date: "2022-05-30",
        value: 11755
      }, {
        date: "2022-06-06",
        value: 16223
      }, {
        date: "2022-06-13",
        value: 20838
      }, {
        date: "2022-06-20",
        value: 24342
      }, {
        date: "2022-06-27",
        value: 22324
      }, {
        date: "2022-07-04",
        value: 17961
      }, {
        date: "2022-07-11",
        value: 13947
      }, {
        date: "2022-07-18",
        value: 10859
      }, {
        date: "2022-07-25",
        value: 9128
      }, {
        date: "2022-08-01",
        value: 6945
      }, {
        date: "2022-08-08",
        value: 6060
      }, {
        date: "2022-08-15",
        value: 5407
      }, {
        date: "2022-08-22",
        value: 5085
      }, {
        date: "2022-08-29",
        value: 5594
      }, {
        date: "2022-09-05",
        value: 8320
      }, {
        date: "2022-09-12",
        value: 10505
      }, {
        date: "2022-09-19",
        value: 12006
      }, {
        date: "2022-09-26",
        value: 11183
      }, {
        date: "2022-10-03",
        value: 9765
      }, {
        date: "2022-10-10",
        value: 7217
      }, {
        date: "2022-10-17",
        value: 5533
      }, {
        date: "2022-10-24",
        value: 4858
      }, {
        date: "2022-10-31",
        value: 4588
      }, {
        date: "2022-11-07",
        value: 4861
      }, {
        date: "2022-11-14",
        value: 5694
      }, {
        date: "2022-11-21",
        value: 7226
      }, {
        date: "2022-11-28",
        value: 9913
      }, {
        date: "2022-12-05",
        value: 11453
      }, {
        date: "2022-12-12",
        value: 10290
      }]
    }
  ]};