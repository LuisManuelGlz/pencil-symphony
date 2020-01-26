import React, { useState } from 'react';

import UpdateAcount from './UpdateAccount';
import ChangePassword from './ChangePassword';

const Account = () => {
  const [selected, setSelected] = useState('account settings');

  const getComponent = selected => {
    switch (selected) {
      case 'account settings':
        return <UpdateAcount />;
      case 'change password':
        return <ChangePassword />;
      default:
        return;
    }
  };

  return (
    <div className="row">
      <div className="col-3">
        <div className="list-group">
          <button
            className={`list-group-item list-group-item-action ${selected === 'account settings' && 'active'}`}
            onClick={() => setSelected('account settings')}
          >
            Account settings
          </button>
          <button
            className={`list-group-item list-group-item-action ${selected === 'change password' && 'active'}`}
            onClick={() => setSelected('change password')}
          >
            Change password
          </button>
        </div>
      </div>
      <div className="col-6">{getComponent(selected)}</div>
    </div>
  );
};

export default Account;
