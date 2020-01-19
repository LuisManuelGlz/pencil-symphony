import React, { Component } from 'react';

import UpdateAcount from './UpdateAccount';
import ChangePassword from './ChangePassword';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'account settings'
    };

    this.getComponent = this.getComponent.bind(this);
  }

  getComponent(selected) {
    switch (selected) {
      case 'account settings':
        return <UpdateAcount />;
      case 'change password':
        return <ChangePassword />;
      default:
        return;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-3">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${this.state
                .selected === 'account settings' && 'active'}`}
              onClick={() => this.setState({ selected: 'account settings' })}
            >
              Account settings
            </button>
            <button
              className={`list-group-item list-group-item-action ${this.state
                .selected === 'change password' && 'active'}`}
              onClick={() => this.setState({ selected: 'change password' })}
            >
              Change password
            </button>
          </div>
        </div>
        <div className="col-6">{this.getComponent(this.state.selected)}</div>
      </div>
    );
  }
}

export default Account;
