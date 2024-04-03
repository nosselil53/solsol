import {X} from "react-feather"
const NotificationSection = (props) => {
    const closeLeftSide = () => {
      document.querySelector(".notification-tab").classList.remove("active")
      document.querySelector(".recent-default").classList.add("active");
      props.ActiveTab("")
    }
    return (
        <div className={`notification-tab dynemic-sidebar custom-scroll ${props.tab === "notification" ? "active" : ""}`} id="notification">
            <div className="theme-title">
              <div className="media">
                <div> 
                  <h2>Notification</h2>
                  <h4>List of notification</h4>
                </div>
                <div className='media-body text-right'>
               {' '}
              <a
              className='icon-btn btn-outline-light btn-sm close-panel'
            
              onClick={() => closeLeftSide()}
            >
              <X />
            </a>
          </div>
              </div>
            </div>
            
                </div>
      
    );
}

export default NotificationSection;