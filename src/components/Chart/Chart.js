import React, { Component } from 'react';
import highcharts from 'highcharts';

class Chart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chart: null,
            tabType: 'short',
            chartName: ''
        }
    }

    componentDidMount() {
        this.fetchData();
    }

     componentWillReceiveProps() {
        this.fetchData();   
    }

  clickTab(type) {
    switch(type) {
        case 'outstanding':
        this.setState({ tabType: 'outstanding'}, () => {
            this.fetchData();
        })
        break;
        case 'short':
        this.setState({ tabType: 'short'}, () => {
            this.fetchData();
        })
        break;
        case 'days':
        this.setState({ tabType: 'days'}, () => {
            this.fetchData();
        })
        break;
        case 'short-outstanding':
        this.setState({ tabType: 'short-outstanding'}, () => {
            this.fetchData();
        })
        break;
    }
  }

  fetchData() {
    const { security } = this.props;
    const { tabType } = this.state;
    var api;

    switch(tabType) {
        case 'short':
        api = 'short-volume-percentages';
        break;

        case 'outstanding':
        api = 'loan-outstanding-percentages';
        break;

        case 'days':
        api = 'days-to-covers';
        break;

        case 'short-outstanding':
        api = 'short-outstanding-percentages'
        break;
    }

    fetch('http://127.0.0.1:8080/'+api+'/' + security.id + '?start_date=2018-01-01&end_date=2018-07-17') 
    .then(res => {
      return res.json();
    })
    .then(data => {
        console.log('data', data)
        let result1 = [];
        data.forEach(function(item) {
            
            if(tabType === 'short') {
                result1.push([ item.date, +item.short_volume ])
            } else if(tabType === 'outstanding') {
                result1.push([ item.date, +item.loan_outstanding_shares ])
            } else if(tabType === 'days') {
                result1.push([ item.date, +item.days_to_cover_in_shares ])
            } else if(tabType === 'short-outstanding') {
                result1.push([ item.date, +item.short_outstanding_shares ])
            }

            // console.log(tabType, typeof tabType)
            // switch(tabType) {
            //     case 'short':
            //     console.log('short')
            //         result1.push([ item.date, +item.trading_volume]);
            //         break;
            //     case 'outstadning':
            //     console.log('out')
            //         result1.push([ item.date, +item.floating_shares]);
            //         break;
            // }
        })
      this.setState ({
        tradingData: result1,
      }, () => {
        this.renderChart();
      });
    });
  }

  renderChart() {

    const {tabType} = this.state;
    let chartName = '';

    switch(tabType) {
        case 'short':
        chartName= '공매도 거래량';
        break;

        case 'outstanding':
        chartName= "대차 잔고량";
        break;

        case 'days':
        chartName= '숏커버 소요일'
        break;

        case 'short-outstanding':
        chartName= '공매도 잔고량'
        break;
    }

    highcharts.chart('chart-1', {
      chart: {
          type: 'spline'
      },
      title: {
          text: chartName
      },
      xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%b \'%y',
            year: '%Y'
          },
          title: {
              text: 'Date'
          }
      },
      yAxis: {
          title: {
              text: 'trading volume'
          },
      },
      tooltip: {
      },
  
      plotOptions: {
          spline: {
              marker: {
                  enabled: true
              }
          }
      },
        series: [{
          name: "Trading Volume",
          data: this.state.tradingData
      }]
  });
  }

  render() {
//tabtye

    return (
    <div className="tab">
        <div className="on tab-item" onClick={() =>{this.clickTab('short')}}>공매도 거래량</div>
        <div className="tab-item" onClick={() =>{this.clickTab('outstanding')}}>대차 잔고량</div>
        <div className="tab-item" onClick={() =>{this.clickTab('days')}}>숏커버 소요일</div>
        <div className="tab-item" onClick={() =>{this.clickTab('short-outstanding')}}>공매도 잔고량</div>
        <div id="chart-1">
        </div>
    </div>
    );
  }
}

export default Chart;
