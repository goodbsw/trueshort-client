import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      securities: [{ name: 's', ticker: 33333, english_name: 'sdf'}, { name: '삼', ticker: 22333, english_name: 'englush'}],
      keyworld: "",
      listBoxShow: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.listItemHandleClick = this.listItemHandleClick.bind(this);
  }

  handleChange(e) {
    this.setState ({
      keyworld: e.target.value
    }, () => {
      this.search()
    })
  }

  search() {
    if (this.state.keyworld === "") {
      this.setState ({
        listBoxShow: false
      });
    } else {
      fetch('http://127.0.0.1:8080/search/' + this.state.keyworld)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState ({
          securities: data,
          listBoxShow: true
        });
      });
    }
  }

  listItemHandleClick(security) {
    this.setState ({
     listBoxShow: false,
     keyworld: security["name"],
    })
    this.props.setSecurity(security);
  }

  render() {   
    var listBoxEl;
    
    if (this.state.listBoxShow === true) {
      listBoxEl = (
        <ul>
        {this.state.securities.slice(0, 5).map((security) => (
          <li key={security.id} onClick={() => {this.listItemHandleClick(security)}}>{security["english_name"]} {security["name"]} {security["ticker"]}</li>
            ))}
        </ul>
      );
    }

    return (
      <div className="search-1">
        <input
          className="input"
          type="text"
          onChange={this.handleChange}
          value={this.state.keyworld}
          placeholder="종목명을 입력해주세요"
        />
        {listBoxEl}
      </div>
    );
  }
}

export default Search;
