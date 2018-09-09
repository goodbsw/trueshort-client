import React, { Component } from 'react';
import Detail from '../Detail/Detail';
import Chart from '../Chart/Chart';

class Info extends Component {

  render() {
    const { selectedSecurity } = this.props;

    return (
      <div className="info-1">
        {selectedSecurity ? (
        <div>
          <Detail security = {selectedSecurity} />
          <Chart security = {selectedSecurity}/>
        </div>
        ) : (
          <p className="pSearch">원하시는 주식을 검색해주세요!</p>
        )}
      </div>
    );
  }
}

export default Info;
