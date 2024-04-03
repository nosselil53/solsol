import {X} from "react-feather"

const ContactListSection = (props) => {
	const closeLeftSide = () => {
		document.querySelector(".contact-list-tab").classList.remove("active");
		document.querySelector(".recent-default").classList.add("active");
		props.ActiveTab("");
	};
	
	return (
		<div
			className={`contact-list-tab dynemic-sidebar custom-scroll ${
				props.tab === "contact" ? "active" : ""
			}`}
			id="contact-list"
		>
			<div className="theme-title">
				<div className="media">
					<div>
						<h2>Contact</h2>
						<h4>Start talking now</h4>
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
};

export default ContactListSection;
