import { client } from "../../lib/client";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useWallet } from "@solana/wallet-adapter-react";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, } from "@nfteyez/sol-rayz";
import * as web3 from '@solana/web3.js';
import { Edit,X } from "react-feather"
import { useEffect, useState } from 'react';
const StatusSection = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
const[uname,setUname]=useState()
  const [profile, setProfile] = useState({
    username: '',
    editStatus: false,
  });
  const {connected,publicKey}= useWallet()
  const[imageurl,setImageurl]=useState("")
  const [imgs,setImgs]=useState([])
  const [iid,setId]=useState()

  const imageData = []
     
//fetch user image 


useEffect(()=>{
  if(connected){
    let pub=publicKey.toString()
    client.fetch(
  `*[_type == "users" && walletAddress == "${pub}"]{
   _id,
   name,
    profileImage,
  }`
).then((data) => {
if (data.length > 0) {
 
  const profileImageUrl = data[0].profileImage;
const iiid = data[0]._id
const n = data[0].name
if(n.length >10){
  setUname(n.substring(0, 5)+"...")
}else{
  setUname(n)
}
setId(iiid)

  setImageurl(profileImageUrl);

 
} 
}
).catch(console.error)


  }
},[connected,imageurl])


	const closeLeftSide = () => {
    document.querySelector(".notification-tab").classList.remove("active")
    document.querySelector(".recent-default").classList.add("active");
    props.ActiveTab("")
    }
    
    const ProfileHandle = (e) => {
     
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
      console.log(profile)
    };
  
    const EditProfile = (e) => {
      e.preventDefault();
      client
.patch(iid)
.set({ name: profile.username })
.commit()
.then(() => {
  console.log(' Username updated successfully.');
  setUname(profile.username)
})
.catch((error) => {
  console.error('Failed to update Username:', error);
});
      setProfile({ ...profile, editStatus: !profile.editStatus });
    
    };
    const toggleModal = async() => {
      setModalOpen(!modalOpen);
      const connect = new web3.Connection("https://distinguished-muddy-sheet.solana-mainnet.quiknode.pro/57b33ee7d040a3657da96f795b4f2d0be158571e/");

  
      let ownerToken = publicKey.toString();
    
      const result = isValidSolanaAddress(ownerToken);
      console.log("result", result);
    
    
    const nfts = await getParsedNftAccountsByOwner({
      publicAddress: publicKey,
    
      connection: connect,
      serialization: true,
    });

    console.log("nfts",nfts) 
   
   
  
      await Promise.all(nfts.map(async (obj) => {const response = await fetch(obj.data.uri); const result = await response.json(); imageData.push({name: obj.data.name, src: result.image});}));
     
 
        setImgs(imageData)
        
    }

    const handleImageClick = (event) => {
      setSelectedImage(event.target.src);
    }
    const cancel = (e) => {
      console.log("ee")
      setProfile({ ...profile, editStatus: !profile.editStatus });
    }
  
   
    const handleSaveClick = () => {
  

client
.patch(iid)
.set({ profileImage: selectedImage })
.commit()
.then(() => {
  console.log(' Profile image updated successfully.');
  setImageurl(selectedImage);
})
.catch((error) => {
  console.error('Failed to update Profile image:', error);
});
      
      
    
      toggleModal();
    }
    return (
        <div className={`status-tab custom-scroll dynemic-sidebar ${props.tab === "status" ? "active" : ""}`} id="status">
            <div className="my-status-box">
              <div className="status-content">
                <div className="media">
                  <div className="img-status">
                    <div className="user-status  bg-size" style={{ backgroundImage: `url(${imageurl})`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}></div>
                    <div className="upload-img">
                    <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}> Votre Nfts </ModalHeader>
        <ModalBody>
          <div>
            {imgs.map((image)=>(
             
               
              <img src={image.src} alt="Placeholder 1" onClick={handleImageClick} style={{ width: '200px' ,height: '200px'}} />
            
            ))}
            
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          <Button color="primary" onClick={handleSaveClick}>Save</Button>
        </ModalFooter>
      </Modal>
                     <input type="button"onClick={toggleModal} ></input>
                    </div>
                  </div>
                  <div className="media-body">
                    
                    <h3>my status</h3>
                    <p>tap to add status Update</p>
                    
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
            <div className='theme-title'>
        <div className='media'>
          <div>
            <h2>Settings</h2>
            <h4>Change your app setting.</h4>
          </div>
          <div className='media-body text-right'>
            {' '}
         
          </div>
        </div>
        <div className='profile-box'>
          <div className={`media ${profile.editStatus ? 'open' : ''}`}>
            <div
              className='profile'
              style={{
                backgroundImage: `url('${imageurl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'block',
              }}
            >
              <img
                className='bg-img'
                src='/assets/images/avtar/3.jpg'
                alt='Avatar'
                style={{ display: 'none' }}
              />
            </div>
            <div className='details'>
              <h5>{uname}</h5>
             
            </div>
            <div className='details edit'>
              <form className='form-radious form-sm'>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    type='text'
                    name='username'
                    defaultValue={profile.username}
                    onChange={(e) => ProfileHandle(e)}
                  />
                </div>
      
              </form>
            </div>
            <div className='media-body'>
              <a
                className='icon-btn btn-outline-light btn-sm pull-right edit-btn'
               
                onClick={(e) => EditProfile(e)}
              >
                {' '}
                <Edit />
              </a>   
              <a
              className={profile.editStatus ? 'icon-btn btn-outline-light btn-sm close-panel' : 'Nondisplayed'}
              
              onClick={(e) => cancel(e)}
            >
              <X />
            </a>
            </div>
          </div>
        </div>
      </div>
            </div>
       
    );
}

export default StatusSection;