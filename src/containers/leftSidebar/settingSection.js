import { Edit, ChevronLeft, X, ChevronRight } from 'react-feather';
import { Input } from 'reactstrap';
import { useState } from 'react';


const SettingSection = (props) => {


  const [acctRequestDisable, setDisable] = useState(false);
  const [deleteAcct, setDeleteDisable] = useState(false);
  const [settingTab, setSettingTab] = useState('');

  const [collapseShow, setCollapseShow] = useState({
    security: false,
    privacy: false,
    verfication: false,
    changeNumber: false,
    accountInfo: false,
    deleteAccount: false,
  });

 

  const closeLeftSide = () => {
    document.querySelector('.settings-tab').classList.remove('active');
    document.querySelector('.recent-default').classList.add('active');
    props.ActiveTab('');
  };


  return (
    <div
      className={`settings-tab dynemic-sidebar custom-scroll dark ${
        props.tab === 'setting' ? 'active' : ''
      }`}
      id='settings'
    >
     
      <div className='setting-block'>
      <div className='media-body text-right'>
               {' '}
              <a
              className='icon-btn btn-outline-light btn-sm close-panel'
              
              onClick={() => closeLeftSide()}
            >
              <X />
            </a>
          </div>
        <div className={`block ${settingTab === 'account' ? 'open' : ''}`}>
          <div className='media'>
            <div className='media-body'>
              <h3>Account</h3>
            </div>
            
            <div className='media-right'>
              <a
                className='icon-btn btn-outline-light btn-sm pull-right previous'
               
                onClick={() => setSettingTab('')}
              >
                {' '}
                <ChevronLeft />
              </a>
            </div>
          </div>
          <div className='theme-according' id='accordion' style={{color
                :'white'}}>
            <div className='card' >
              <div
                className='card-header'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    security: !collapseShow.security,
                    privacy: false,
                    changeNumber: false,
                    accountInfo: false,
                    deleteAccount: false,
                    verfication: false,
                  })
                }
              >
                <a>
                  Security<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div
                className={`collapse ${collapseShow.security ? 'show' : ''}`}
                id='collapseTwo'
                data-parent='#accordion'
              >
                <div className='card-body'>
                  <div className='media'>
                    <div className='media-body'>
                      <h5>Show Security notification</h5>
                    </div>
                    <div className='media-right'>
                      <Input
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch4'
                        name='customSwitch'
                        label=''
                        defaultChecked
                      />
                    </div>
                  </div>
                  <p>
                    {' '}
                    <b>Note : </b>turn on this setting to recive notification
                    when a contact's security code has been changes.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div
                className='card-header'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    privacy: !collapseShow.privacy,
                    changeNumber: false,
                    accountInfo: false,
                    deleteAccount: false,
                    verfication: false,
                    security: false,
                  })
                }
              >
                <a>
                  Privacy<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div className={`collapse ${collapseShow.privacy ? 'show' : ''}`}>
                <div className='card-body'>
                  <ul className='privacy'>
                    <li>
                      <h5>Last seen</h5>
                      <Input
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch5'
                        name='customSwitch'
                        label=''
                        defaultChecked
                      />
                      <p>
                        {' '}
                        <b>Note : </b>turn on this setting to whether your
                        contact can see last seen or not.
                      </p>
                    </li>
                    <li>
                      <h5>Profile Photo</h5>
                      <Input
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch6'
                        name='customSwitch'
                        label=''
                      />
                      <p>
                        turn on this setting to whether your contact can see
                        your profile or not.
                      </p>
                    </li>
                    <li>
                      <h5>About</h5>
                      <Input
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch7'
                        name='customSwitch'
                        label=''
                      />
                      <p>
                        {' '}
                        <b>Note : </b>turn on this setting to whether your
                        contact can see about status or not.
                      </p>
                    </li>
                    <li>
                      <h5>Status</h5>
                      <Input
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch8'
                        name='customSwitch'
                        label=''
                      />
                      <p>
                        {' '}
                        <b>Note : </b>turn on this setting to whether your
                        contact can see your status or not.{' '}
                      </p>
                    </li>
                    <li>
                      <h5>Read receipts</h5>
                      <Input
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch9'
                        name='customSwitch'
                        label=''
                      />
                      <p>
                        {' '}
                        <b>Note : </b>If turn off this option you won't be able
                        to see read recipts from contact. read receipts are
                        always sent for group chats.{' '}
                      </p>
                    </li>
                    <li>
                      <h5>Groups</h5>
                      <Input
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch10'
                        name='customSwitch'
                        label=''
                        defaultChecked
                      />
                      <p>
                        {' '}
                        <b>Note : </b>turn on this setting to whether your
                        contact can add in groups or not.{' '}
                      </p>
                    </li>
                    <li>
                      <h5>Screen Lock(Require Touch ID)</h5>
                      <Input
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch11'
                        name='customSwitch'
                        label=''
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <div className='card'>
              <div
                className='card-header'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    accountInfo: !collapseShow.accountInfo,
                    changeNumber: false,
                    privacy: false,
                    deleteAccount: false,
                    verfication: false,
                    security: false,
                  })
                }
              >
                <a>
                  Request account info<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div
                className={`collapse ${collapseShow.accountInfo ? 'show' : ''}`}
              >
                <div className='card-body'>
                  <a className={`p-0 req-info ${acctRequestDisable ? 'disabled' : ''}`} id='demo'  disabled={acctRequestDisable} onClick={() => setDisable(true)}>
                    Request Info
                  </a>
                  <p>
                    {' '}
                    <b>Note : </b>Create a report of your account information
                    and settings, which you can access ot port to another app.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div
                className='card-header'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    deleteAccount: !collapseShow.deleteAccount,
                    changeNumber: false,
                    accountInfo: false,
                    privacy: false,
                    verfication: false,
                    security: false,
                  })
                }
              >
                <a>
                  Delete My account<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div
                className={`collapse ${
                  collapseShow.deleteAccount ? 'show' : ''
                }`}
              >
                <div className='card-body'>
                  <a className={`p-0 req-info font-danger ${deleteAcct ? 'disabled' : ''}`}  disabled={deleteAcct} onClick={() => setDeleteDisable(true)}>
                    Delete Account{' '}
                  </a>
                  <p>
                    {' '}
                    <b>Note :</b>Deleting your account will delete your account
                    info, profile photo, all groups & chat history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='media'>
          <div className='media-body'>
            <h3>Account</h3>
            <h4>Update Your Account Details</h4>
          </div>
          <div className='media-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm pull-right next'
              
              onClick={() => setSettingTab('account')}
            >
              {' '}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
      <div className='setting-block'>
        <div className={`block ${settingTab === 'chat' ? 'open' : ''}`}>
          <div className='media'>
            <div className='media-body'>
              <h3>Chat</h3>
            </div>
            <div className='media-right'>
              <a
                className='icon-btn btn-outline-light btn-sm pull-right previous'
               
                onClick={() => setSettingTab('')}
              >
                {' '}
                <ChevronLeft />
              </a>
            </div>
          </div>
          <ul className='help'>

  
            <li>
              <h5>
                {' '}
                <a >Archive all chat</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a > Clear all chats</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a className='font-danger' >
                  Delete all chats
                </a>
              </h5>
            </li>
          </ul>
        </div>
        <div className='media'>
          <div className='media-body'>
            <h3>Chat</h3>
            <h4>Control Your Chat Backup</h4>
          </div>
          <div className='media-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm pull-right next'
              
              onClick={() => setSettingTab('chat')}
            >
              {' '}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
      <div className='setting-block'>
        <div className={`block ${settingTab === 'help' ? 'open' : ''}`}>
          <div className='media'>
            <div className='media-body'>
              <h3>Help</h3>
            </div>
            <div className='media-right'>
              {' '}
              <a
                className='icon-btn btn-outline-light btn-sm pull-right previous'
              
                onClick={() => setSettingTab('')}
              >
                {' '}
                <ChevronLeft />
              </a>
            </div>
          </div>
          <ul className='help'>
            <li>
              <h5>
                {' '}
                <a >FAQ</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a > Contact Us</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a >Terms and Privacy Policy</a>
              </h5>
            </li>
            
            <li>
              <h5>
                {' '}
                <a >2023 - 2024 Powered by Holistic Winter</a>
              </h5>
            </li>
          </ul>
        </div>
        <div className='media'>
          <div className='media-body'>
            <h3>Help</h3>
           
          </div>
          <div className='media-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm pull-right next'
              
              onClick={() => setSettingTab('help')}
            >
              {' '}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingSection;
