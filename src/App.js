import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import Perf from 'react-addons-perf'
import autobind from 'autobind-decorator'
import './App.css';

import { turnOn, turnOff } from './exampleReducer'

const renderButtonContent = ({active, index, onClick, children}, updated) => {
  return (
    <div>
      <button className={active ? 'active' : ''} onClick={() => onClick(index)}>{children}</button>
      {updated && <span style={{display: 'inline-block'}}>updated...</span>}
    </div>
  );
}

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {updated: false};
  }

  componentWillUpdate(_nextProps, nextState) {
    if (nextState.updated === false && this.state.updated !== true) {
      this.setState({updated: true});
      setTimeout(() => this.setState({updated: false}), 1000);
    }
  }

  render() {
    return renderButtonContent(this.props, this.state.updated);
  }
}

class ShouldComponentUpdateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {updated: false};
  }

  shouldComponentUpdate(prevProps, prevState) {
    return prevProps.active !== this.props.active ||
           prevState.updated !== this.state.updated; // needed to display this component updates
  }

  componentWillUpdate(_nextProps, nextState) {
    if (nextState.updated === false && this.state.updated !== true) {
      this.setState({updated: true});
      setTimeout(() => this.setState({updated: false}), 1000);
    }
  }

  render() {
    return renderButtonContent(this.props, this.state.updated);
  }
}

class PureComponentButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {updated: false};
  }

  componentWillUpdate(_nextProps, nextState) {
    if (nextState.updated === false && this.state.updated !== true) {
      this.setState({updated: true});
      setTimeout(() => this.setState({updated: false}), 1000);
    }
  }

  render() {
    return renderButtonContent(this.props, this.state.updated);
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.boundHandleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    window.Perf = Perf;
  }

  handleButtonClick(index) {
    if (this.isButtonActive(index)) {
      this.props.dispatch(turnOff(index));
    } else {
      this.props.dispatch(turnOn(index));
    }
  }

  @autobind
  autoBoundHandleButtonClick(index) {
    if (this.isButtonActive(index)) {
      this.props.dispatch(turnOff(index));
    } else {
      this.props.dispatch(turnOn(index));
    }
  }

  isButtonActive(index) {
    return this.props.activeIndices.indexOf(index) !== -1;
  }

  render() {
    return (
      <div className="list">
        <p>Example to visualize when a component updates on rerender of the parent.</p>
        <h2>Simple button</h2>
        <p>These buttons always update.</p>
        <Button index={0} onClick={this.handleButtonClick.bind(this)} active={this.isButtonActive(0)}>.bind(this)</Button>
        <Button index={1} onClick={(index) => this.handleButtonClick(index)} active={this.isButtonActive(1)}>function arrow syntax</Button>
        <Button index={2} onClick={this.boundHandleButtonClick} active={this.isButtonActive(2)}>this binding in constructor</Button>
        <Button index={3} onClick={this.autoBoundHandleButtonClick} active={this.isButtonActive(3)}>@autobind decorator</Button>

        <h2>shouldComponentUpdate</h2>
        <p>These buttons only update when their "active" prop changes.</p>
        <ShouldComponentUpdateButton index={4} onClick={this.handleButtonClick.bind(this)} active={this.isButtonActive(4)}>.bind(this)</ShouldComponentUpdateButton>
        <ShouldComponentUpdateButton index={5} onClick={(index) => this.handleButtonClick(index)} active={this.isButtonActive(5)}>function arrow syntax</ShouldComponentUpdateButton>
        <ShouldComponentUpdateButton index={6} onClick={this.boundHandleButtonClick} active={this.isButtonActive(6)}>this binding in constructor</ShouldComponentUpdateButton>
        <ShouldComponentUpdateButton index={7} onClick={this.autoBoundHandleButtonClick} active={this.isButtonActive(7)}>@autobind decorator</ShouldComponentUpdateButton>


        <h2>PureComponent</h2>
        <p>These buttons update when any of their props change.</p>
        <PureComponentButton index={8} onClick={this.handleButtonClick.bind(this)} active={this.isButtonActive(8)}>.bind(this)</PureComponentButton>
        <PureComponentButton index={9} onClick={(index) => this.handleButtonClick(index)} active={this.isButtonActive(9)}>function arrow syntax</PureComponentButton>
        <PureComponentButton index={10} onClick={this.boundHandleButtonClick} active={this.isButtonActive(10)}>this binding in constructor</PureComponentButton>
        <PureComponentButton index={11} onClick={this.autoBoundHandleButtonClick} active={this.isButtonActive(11)}>@autobind decorator</PureComponentButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeIndices: state
  };
}

export default connect(mapStateToProps)(App);
