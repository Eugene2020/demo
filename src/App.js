import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      elements: [],
      createNewArrayValue: 10000,
      newElementLabel: "",
      newElementValue: "",
      filteredLabel: "",
      filteredValue: "",
    }
    this.sorted = { label: true };
  }
  HandleChangeGenerateElements(event) {
    this.setState({ createNewArrayValue: event.target.value });
  }
  generateElements(event) {
    this.state.elements.splice(0,this.state.elements.length);
    for (let i = 0; i < this.state.createNewArrayValue; i++) {
      this.state.elements.push({label: i, value: i});
    }
    this.setState({ elements: this.state.elements });
    event.preventDefault();
  }
  deleteItem(index) { // Удаление пункта
    this.state.elements.splice(index, 1);
    this.setState({ elements: this.state.elements });
  }
  addItem(event) { // Добавление нового пункта
    this.state.elements.push({label: this.state.newElementLabel, value: this.state.newElementValue});
    this.setState({ elements: this.state.elements });
    event.preventDefault();
  }
  editItem(index) {
    let editedElementLabel = prompt("new label");
    let editedElementValue = prompt("new value");
    if (editedElementLabel != null && editedElementValue != null) {
      this.state.elements[index] = {label: editedElementLabel, value: editedElementValue};
    }
    this.setState({ elements: this.state.elements });
  }
  handleChangeNewLabel(event) { 
    this.setState({ newElementLabel: event.target.value });
  }
  handleChangeNewValue(event) { 
    this.setState({ newElementValue: event.target.value });
  }
  sortUl() {
    this.setState({ elements: (this.state.elements).sort((a, b) => a.label > b.label) })
  }
  sortUlReverse() {
    this.setState({ elements: (this.state.elements).sort((a, b) => a.label < b.label) })
  }
  handleChangefilterLabel(event) {
    this.setState({ filteredLabel: event.target.value });
  }
  handleChangefilterValue(event) {
    this.setState({ filteredValue: event.target.value });
  }
  filterLabel() {
    var filteredLabel = this.state.filteredLabel;
    this.setState({ elements: (this.state.elements).filter(item => item.label == filteredLabel) })
  }
  filterValue() {
    var filteredValue = this.state.filteredValue;
    this.setState({ elements: (this.state.elements).filter(item => item.value == filteredValue) })
  }
  render() {
    const list = this.state.elements.map((item, index) => {
      return (
        <li key={index} index={index}>
          <button onClick={this.deleteItem.bind(this, index)}>⌫</button>
          label: {item.label}, value: {item.value}           
          <button onClick={this.editItem.bind(this, index)}>✎</button>
        </li>
      );
    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form className="form" onSubmit={this.generateElements.bind(this)}>
				  <input
            defaultValue={this.state.createNewArrayValue}
            onChange={this.HandleChangeGenerateElements.bind(this)}
          />
          <input type="submit" value="Сгенерировать столько" />
        </form>
        <button onClick={ this.sortUl.bind(this) }>Сортировать по label по возрастанию</button>
        <button onClick={ this.sortUlReverse.bind(this) }>Сортировать по label по убыванию</button>
        <br />
        <input onChange={this.handleChangefilterLabel.bind(this)} />
        <button onClick={ this.filterLabel.bind(this) }>фильтровать по label</button>
        <br />
        <input onChange={this.handleChangefilterValue.bind(this)} />
        <button onClick={ this.filterValue.bind(this) }>фильтровать по value</button>
        <form className="form" onSubmit={this.addItem.bind(this)}>
				  <input
            placeholder="label"
            value={this.state.newElementLabel}
            onChange={this.handleChangeNewLabel.bind(this)}
          />
          <input
            placeholder="value"
            value={this.state.newElementValue}
            onChange={this.handleChangeNewValue.bind(this)}
          />
          <input type="submit" value="Добавить" />
        </form>
        <ul>{list}</ul>
      </div>
    );
  }
}

export default App;
