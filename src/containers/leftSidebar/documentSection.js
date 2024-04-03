import {X} from "react-feather"

const DocumentSection = (props) => {
  const closeLeftSide = () => {
    document.querySelector('.document-tab').classList.remove('active');
    document.querySelector('.recent-default').classList.add('active');
    props.ActiveTab('');
  };
  return (
    <div
      className={`document-tab dynemic-sidebar ${
        props.tab === 'document' ? 'active' : ''
      }`}
      id='document'
    >
      <div className='theme-title'>
        <div className='media'>
          <div>
            <h2>Document</h2>
            <h4>List of document</h4>
         
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

export default DocumentSection;
