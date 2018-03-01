import React, { Component } from 'react';

class StartPage extends Component {
  state = { display: '3' }

  render() {
    return (
      <div className="page white">
        <div className='flex-container'>
          <h1 className='bold-number title'>{ this.state.display }</h1>
        </div>
      </div>
    );
  }

  componentDidMount() {
    setInterval( ()=> {
      switch (this.state.display) {
        case '3':
          this.setState({ display: '2' });
          break;
        case '2':
          this.setState({ display: '1' });
          break;
        case '1':
          this.setState({ display: 'start' });
          break;
        default:
          clearInterval();
          break;
      }
    }, 1000)
  }
}

export default StartPage;
