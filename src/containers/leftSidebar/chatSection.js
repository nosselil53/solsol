//sanity client import
import { client } from '../../lib/client';
import axios from 'axios';
import { useState , useEffect, useCallback, useMemo} from 'react';
import { PROGRAM_PUBKEY } from '../smartcontract/smart';
import { IDL as profileIdl } from '../smartcontract/idl';
import * as anchor from '@project-serum/anchor'
import {
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';
import { Connection } from '@solana/web3.js';
import { useAnchorWallet,useConnection,useWallet } from '@solana/wallet-adapter-react';
import { getParsedNftAccountsByOwner,isValidSolanaAddress, } from "@nfteyez/sol-rayz";

const ChatSection = () => {
  const [rooms,setRooms]= useState([])
  const [global,setgolbal]= useState([])
  const [activeTab] = useState('chat');
  const [chatSubTab, setChatSubTab] = useState('direct');

 
 

  const {connected,publicKey}= useWallet()

  const [imgs, setImgs] = useState([]);
  const { connection } = useConnection()
  const anchorWallet = useAnchorWallet()
  const program = useMemo(() => {
    if (anchorWallet) {
        const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
        return new anchor.Program(profileIdl, PROGRAM_PUBKEY, provider)

    }
}, [connection, anchorWallet])


useEffect(() => {
  const Access = async () => {
      if (program && connected) {
        try {
     
          const dataValue = 123; 
          const tx = await program.initialize(dataValue ,{
            accounts: {
              newAccount: publicKey
            },
            signers: [], 
          });
    
          console.log('access', tx);
        } catch (error) {
        
          console.log('problem acces');
        }
      }
    
   
      
      
  }

  Access();
}, [ program])

  useEffect(()=>{
    
    client.fetch(`*[_type == "rooms" && roomId =="#Global" ]{
      roomName,
      roomId,
      "avatar":image.asset->url,
    }`
      
    ).then((data)=> setgolbal(data)).catch(console.error)
  },[])
  
  useEffect(() => {
    const fetchData = async () => {
      const connect = new Connection("https://distinguished-muddy-sheet.solana-mainnet.quiknode.pro/57b33ee7d040a3657da96f795b4f2d0be158571e/");
  
      let ownerToken = publicKey.toString();
    
      const result = isValidSolanaAddress(ownerToken);
      
    
      const nfts = await getParsedNftAccountsByOwner({
        publicAddress: publicKey,
        connection: connect,
        serialization: true,
      });
  
      console.log("nfts", nfts);
  
      const imageData = [];
      await Promise.all(nfts.map(async (obj) => {
        const response = await fetch(obj.data.uri);
        const result = await response.json();
        imageData.push({ collection: obj.data.symbol});
      }));
      
      setImgs(imageData);
    };
  
  
    fetchData();
   
  }, [publicKey]);
  
 
  
  function filterAndExtractStrings(array) {
    const filteredArray = array.filter((item, index, self) => {
      // Extract the collection property from each item
      const collection = item.collection;
      
      // Check if the current collection is already present in the filtered array
      const isUnique = self.findIndex((el) => el.collection === collection) === index;
      
      return isUnique;
    });
    
    const extractedStrings = filteredArray.map((item) => item.collection);
    
    return extractedStrings;
  }
  //filter collection 
  const filteredStrings = filterAndExtractStrings(imgs);
  




  




    //sanity fetch
    useEffect(()=>{
      const query= `*[_type == "rooms" && roomName in $filteredStrings]{
        roomName,
        roomId,
        "avatar":image.asset->url,
      }`;
      client.fetch(query, {filteredStrings}
        
      ).then((data)=> setRooms(data)).catch(console.error)
    },[filteredStrings])




  const ToggleChatSubTab = (tab) => {
    setChatSubTab(tab);

    if (tab === 'direct') {
      var element = document.getElementById('chating');
      element.classList.add('active');
    } else {
       element = document.getElementById('chating');
      element.classList.remove('active');
    }

    if (tab === 'group') {
     element = document.getElementById('group_chat');
      element.classList.add('active');
    } else {
       element = document.getElementById('group_chat');
      element.classList.remove('active');
    }
  };
  return (
    <div className='chat custom-scroll'>
      <div className='theme-title'>   
      </div>
      <div className='theme-tab tab-sm chat-tabs'>
        <TabContent activeTab={activeTab}>
          <TabPane
            tabId='chat'
            className='fade show'
            id='chat'
            role='tabpanel'
            aria-label='chat-tab'
          >
            <div className='theme-tab'>
              <Nav tabs id='myTab1' role='tablist'>
                <NavItem>
                  <NavLink
                    className={`button-effect ${chatSubTab === 'direct' ? 'active' : ''
                      }`}
                    onClick={() => ToggleChatSubTab('direct')}
                    id='direct-tab'
                    data-toggle='tab'
                    
                    role='tab'
                    aria-controls='direct'
                    aria-selected='false'
                    data-to='chating'
                  >
                    Daos
                  </NavLink>
               
                </NavItem>
                <NavItem>
                  <NavLink
                    className={`button-effect ${chatSubTab === 'group' ? 'active' : ''
                      }`}
                    onClick={() => ToggleChatSubTab('group')}
                    id='group-tab'
                    data-toggle='tab'
                  
                    role='tab'
                    aria-controls='group'
                    aria-selected='true'
                    data-to='group_chat'
                    
                    >
            
                    Group
                  </NavLink>

                </NavItem>
              </Nav>
              <TabContent activeTab={chatSubTab}>
                <TabPane
                  tabId='direct'
                  className='fade show'
                  id='direct'
                  role='tabpanel'
                  aria-labelledby='direct-tab'
                >
                              <ul className="chat-main">
                              {global.map((gb)=>(
                   <a key ={gb.roomId} href={gb.roomId}>
                    <li className="active" data-to="chating">
                   <div className="chat-box">
                     <div className="profile online">
                       <img
                         className="bg-img"
                         src={gb.avatar}
                         alt="Avatar"
                   width={50}
                   height={50}
             
           
                       />
                     </div>
                     <div className="details">
                       <h5>{gb.roomName}</h5>
                       <h6>{gb.roomId}</h6>
                     </div>
                     <div className="date-status">
                       <div className="badge badge-primary sm">*</div>
                     </div>
                   </div>
                 </li>
                   </a>
                 ))}
                 {rooms.map((room)=>(
                   <a key ={room.roomId} href={room.roomId}>
                    <li className="active" data-to="chating">
                   <div className="chat-box">
                     <div className="profile online">
                       <img
                         className="bg-img"
                         src={room.avatar}
                         alt="Avatar"
                   width={50}
                   height={50}
             
           
                       />
                     </div>
                     <div className="details">
                       <h5>{room.roomName}</h5>
                       <h6>{room.roomId}</h6>
                     </div>
                     <div className="date-status">
                       <div className="badge badge-primary sm">*</div>
                     </div>
                   </div>
                 </li>
                   </a>
                 ))}
                
                  
                </ul>
                </TabPane>
                <TabPane
                  tabId='group'
                  className='fade show'
                  id='group'
                  role='tabpanel'
                  aria-labelledby='group-tab'
                >
                            <ul className="group-main">
                  <li data-to="group_blank">
                    <div className="group-box">
                      <div className="profile">
                        <img
                          className="bg-img"
                          src="../assets/images/avtar/family.png"
                          alt="Avatar"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="details">
                        <h5>Make Solana greater</h5>
                        <h6>
                          Lorem Ipsum is simply dummy text the printing and
                          typesetting industry.
                        </h6>
                      </div>
                      <div className="date-status">
                        <ul className="grop-icon">
                          <li>
                            <a
                              className="group-tp"
                              href="#"
                              data-tippy-content="Josephin"
                            >
                              <img
                                src="../assets/images/avtar/1.jpg"
                                alt="group-icon-img"
                                width={50}
                                height={50}
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              className="group-tp"
                              href="#"
                              data-tippy-content="Jony "
                            >
                              <img
                              src="../assets/images/avtar/2.jpg"
                                alt="group-icon-img"
                                width={50}
                                height={50}
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              className="group-tp"
                              href="#"
                              data-tippy-content="Pabelo"
                            >
                              <img
                                src="../assets/images/avtar/3.jpg"
                                alt="group-icon-img"
                                width={50}
                                height={50}
                              />
                            </a>
                          </li>
                          <li>+ 12</li>
                        </ul>
                        <div className="badge badge-primary" />
                      </div>
                    </div>
                  </li>
                  <li data-to="group_blank">
                    <div className="group-box">
                      <div className="profile">
                        <img
                          className="bg-img"
                          src="../assets/images/avtar/onboard.png"
                          alt="Avatar"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="details">
                        <h5>Onboarding and normies</h5>
                        <h6>
                          Lorem Ipsum is simply dummy text the printing and
                          typesetting industry.
                        </h6>
                      </div>
                    </div>
                  </li>
                  <li data-to="group_blank">
                    <div className="group-box">
                      <div className="profile">
                        <img
                          className="bg-img"
                          src="../assets/images/avtar/jobboard.png"
                          alt="Avatar"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="details">
                        <h5>Open Fee-less Marketplace</h5>
                        <h6>
                          Lorem Ipsum is simply dummy text the printing and
                          typesetting industry.
                        </h6>
                      </div>
                    </div>
                  </li>
                </ul>
                </TabPane>
              </TabContent>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default ChatSection;
