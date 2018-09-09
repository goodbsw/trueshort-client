import React, { Component } from 'react';

class Detail extends Component {


  render() {
    const { security } = this.props;

    return (
      <div className="detail-1">  
            <p id="sName">{security.name} ({security.english_name})</p>
            <p id="sEngName">종목 번호: {security.ticker}</p>
        <p id="linkEx">선택하신 종목에 대하여 더 자세한 정보를 원하신다면 아래 금융 싸이트를 이용하시기 바랍니다</p>
            <a href={"https://finance.naver.com/item/main.nhn?code=" + security.ticker} target="_blank">
              <img src={require("./naver icon.png")} />
            </a>
            <a href={"http://finance.daum.net/item/main.daum?code=" + security.ticker} target="_blank">
              <img src={require("./daum icon.jpg")} />
            </a>
      </div>
    );
  }
}

export default Detail;
