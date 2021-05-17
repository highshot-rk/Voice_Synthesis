import React, { Component } from 'react';
import "./Tab.css";
import HomeIndexNav from 'components/Navbars/HomeIndexNav';
class Tab extends Component {

    state = {
        activeItem: '1'
      };
    
      toggle = tab => e => {
        if (this.state.activeItem !== tab) {
          this.setState({
            activeItem: tab
          });
        }
      };

    render() {
        const { activeItem } = this.state;
        return (
          <>
            <HomeIndexNav/>
          </>
        );
    }
}

export default Tab;


