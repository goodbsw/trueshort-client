import React, { Component } from 'react';
import highcharts from 'highcharts';

class Chart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chart: null,
            tabType: 'short',
            chartName: ""
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

    fetch('http://127.0.0.1:8080/'+api+'/' + security.id) 
    .then(res => {
      return res.json();
    })
    .then(data => {
        console.log('data', data)
        let result1 = [];
        data.forEach(function(item) {
            
            if(tabType === 'short') {
                result1.push([ item.date, +item.trading_volume ])
            } else if(tabType === 'outstanding') {
                result1.push([ item.date, +item.floating_shares ])
            } else if(tabType === 'days') {
                result1.push([ item.date, +item.days_to_cover_in_amount ])
            } else if(tabType === 'short-outstanding') {
                result1.push([ item.date, +item.short_outstanding_percentage ])
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
    const { chartName } = this.state;

    switch(chartName) {
        case 'short':
        this.setState ({chartName: '공매도 거래량' });
        break;
    }

    highcharts.chart('chart-1', {
      chart: {
          type: 'spline'
      },
      title: {
          text: this.state.chartName
      },
      subtitle: {
          text: 'Irregular time data in Highcharts JS'
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
    return (
    <div className="tab">
        <div onClick={() =>{this.clickTab('short')}}>공매도 거래량</div>
        <div onClick={() =>{this.clickTab('outstanding')}}>대차 잔고량</div>
        <div onClick={() =>{this.clickTab('days')}}>숏커버소요기간</div>
        <div onClick={() =>{this.clickTab('short-outstanding')}}>공매도 잔고량</div>
        <div id="chart-1">
        </div>
    </div>
    );
  }
}

export default Chart;
