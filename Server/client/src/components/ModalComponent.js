import React, { Component } from 'react';

class ModalComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalInfo: false
        }
    }
    toggle = info => () => {
        const modalInfo = `modal${info}`;
        this.setState({
          [modalInfo]: !this.state[modalInfo]
        });
      };
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ModalComponent;