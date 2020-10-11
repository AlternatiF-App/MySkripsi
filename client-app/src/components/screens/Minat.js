import React, { Component } from 'react'

class Minat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fruit: "banana",
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      console.log("Fruit Selected!!", e.target.value);
      this.setState({ fruit: e.target.value });
    }
  
    render() {
        const options = [
            {
              label: "Apple",
              value: "apple",
            },
            {
              label: "Mango",
              value: "mango",
            },
            {
              label: "Banana",
              value: "banana",
            },
            {
              label: "Pineapple",
              value: "pineapple",
            },
          ];
      return (
        <div id="App">
          <div className="select-container">
            <select className="browser-default" 
            value={this.state.fruit} onChange={this.handleChange}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      );
    }
  }
  
  export default Minat;