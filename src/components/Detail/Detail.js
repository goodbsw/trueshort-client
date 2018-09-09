import React, { Component } from 'react';

class Detail extends Component {


  render() {
    const { security } = this.props;

    return (
      <div className="detail-1">  
            <p id="sName">{security.name} {security.ticker}</p>
            <p id="sEngName">{security.english_name}</p>
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
