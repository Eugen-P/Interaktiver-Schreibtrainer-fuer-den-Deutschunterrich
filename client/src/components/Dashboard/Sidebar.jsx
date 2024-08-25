

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Link, createRoutesFromElements, useLocation  } from 'react-router-dom';
import axios from 'axios';
import './sidebar.scss'; // Import your sidebar styles here
import { getChatGptResponse } from '../../api/api'

function Sidebar() {
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation();
  const tabId = location.pathname.split("/")[2];

  const [activeTabIndex, setActiveTabIndex] = useState();
  const [newTabName, setNewTabName] = useState('');
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [editedTabName, setEditedTabName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [tabs, setTabs] = useState([]);
  
  const fetchData = async () => {
    try {
    //   const res = await axios.get("http://localhost:8800/posts/posts");
    //   setTabs(res.data);

    // const userId = currentUser?.id; 
    if (currentUser?.id) {
        console.log("user id is " + currentUser?.id)
        // const res = await axios.get(`http://localhost:8800/posts/posts?userid=${userId}`);
        const res = await axios.get(`http://localhost:8800/posts/posts?userid=${currentUser.id}`);
        setTabs(res.data);
    }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabCreate = async (e) => {
    e.preventDefault();

    if (newTabName.trim() !== '') {
      const newTab = {
        tabname: newTabName,
        userid: currentUser?.id,
        answer: null,
        question: null,
        analys: null,
        submitted: 0,
      };

      try {
        const question = await getChatGptResponse(`Ich bin ein Student and lerne deutsche Sprache. Gib mir ein Thema vor, zu dem ich einen Brief schreiben kann. Bitte gestalte das Thema ansprechend und interessant. die Aufgaben sollen aussehen wie Aufgaben von einem deutschgrammatik buch. Deine Antwort muss mit „Schreiben Sie“ starten und muss nur die Aufgabestellung haben. Das muss nicht aussehen wie ein Nachricht von einem Chatbot. Anzahl der Wörtern kann von 180 bis 400 Wörtern sein. Ich will nur eine Aufgabe  von dir sehen. format your answer for html`);
      newTab.question = question;
        console.log("topic " + question)
        console.log("tab id " + tabId)
        // console.log("index " + index)
        console.log("activeTabIndex " + activeTabIndex)
        await axios.post("http://localhost:8800/posts/posts", newTab);
        fetchData(); // Fetch updated tab list after creating a new tab
        setNewTabName('');
        setValidationError('');
      } catch (err) {
        console.log(err);
      }
    } else {
      setValidationError('Tab name is required.');
    }
  };

  const handleDeleteTab = async (index) => {
    try {
      await axios.delete(`http://localhost:8800/posts/posts/${tabs[index].id}`);
      fetchData(); // Fetch updated tab list after deleting a tab
    } catch (err) {
      console.log(err);
    }
    // window.location.href="/dashboard"
    if (window.location.href !==`http://localhost:3000/dashboard/`) {
      window.location.assign('http://localhost:3000/dashboard/')
    }
    
  };

  const handleEditTabName = async (index, newName) => {
    try {
      await axios.put(`http://localhost:8800/posts/posts/${tabs[index].id}`, { tabname: newName });
      fetchData(); // Fetch updated tab list after editing tab name
      setEditModeIndex(-1);
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    const storedTabIndex = localStorage.getItem('activeTabIndex');
    if (storedTabIndex !== null) {
      if (window.location.href !==`http://localhost:3000/dashboard/`)
      setActiveTabIndex(parseInt(storedTabIndex, 10));
    } else {
      setActiveTabIndex(0);
    }
  }, []);
  useEffect(() => {
    // Update local storage whenever the active tab changes
    localStorage.setItem('activeTabIndex', activeTabIndex);
  }, [activeTabIndex]);

  

  return (
    <div className="sidebar">
    
      <div className='sidebarHeader' >
        {currentUser ? (
          <div className="headerSlide">
          <span>Hallo {currentUser?.username}</span>
          <Link to="/login">
              <span onClick={logout}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 31.5">
            <path id="Icon_open-account-logout" data-name="Icon open-account-logout" d="M13.5,0V4.5h18V27h-18v4.5H36V0ZM9,9,0,15.75,9,22.5V18H27V13.5H9Z"/>
          </svg>
          </span>
              </Link>

          </div>
        ) : (
          <div className="headerSlide">
          <Link className="" to="/login">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 31.5">
          <path id="Icon_open-account-login" data-name="Icon open-account-login" d="M13.5,0V4.5h18V27h-18v4.5H36V0ZM18,9v4.5H0V18H18v4.5l9-6.75Z"/>
        </svg>
        </Link>
        </div>

        )}
          <div className="input-tab">
            <div className="add-tab">
              <input
                type="text"
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                placeholder="New Tab Name"
                required
              />
              <button onClick={handleTabCreate}>
                {/* new tab */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 29.25 29.25">
      <g id="Icon_ionic-ios-add-circle-outline" data-name="Icon ionic-ios-add-circle-outline" transform="translate(-3.375 -3.375)">
        <path id="Path_3" data-name="Path 3" d="M24.363,16.875H19.125V11.637a1.125,1.125,0,0,0-2.25,0v5.238H11.637A1.077,1.077,0,0,0,10.512,18a1.089,1.089,0,0,0,1.125,1.125h5.238v5.238A1.09,1.09,0,0,0,18,25.488a1.119,1.119,0,0,0,1.125-1.125V19.125h5.238a1.125,1.125,0,0,0,0-2.25Z"/>
        <path id="Path_4" data-name="Path 4" d="M18,5.344A12.651,12.651,0,1,1,9.049,9.049,12.573,12.573,0,0,1,18,5.344m0-1.969A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Z"/>
      </g>
                </svg>


              </button>
            </div>
            <div className="validation-error">{validationError}</div>
            
            </div>
      </div>
      <ul className="tab-list">
        {tabs.map((tab, index) => (
          <div className="liDiv">
           <button
           className={`liButton ${index === activeTabIndex ? 'active' : ''}`}

            onClick={() => {setActiveTabIndex(index)
            window.location.assign(`http://localhost:3000/dashboard/${tab.id}`);}
          }>
          <li
          
            key={tab.id}
            // className={index === activeTabIndex ? 'active' : ''}
            // className={index === activeTabIndex ? 'active' : ''}
            
           
          >
            
            <p className="over">{tab.tabname}</p>

    
            {/* <button onClick={()=>{window.location.assign(`http://localhost:3000/dashboard/${tab.id}`)}}> */}
              {/* <Link className="link" to={`/dashboard/${tab.id}`}> open</Link> */}
              {/* Open */}
            {/* </button> */}
          </li>
          </button>
            <div className='buttonDiv'>
            {editModeIndex === index ? (
              <>
                <input 
                className="inputChangeName"
                  name="tabname"
                  type="text"
                  value={editedTabName.tabname || tab.tabname}
                  onChange={(e) => setEditedTabName((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                />
                <button onClick={() => handleEditTabName(index, editedTabName.tabname)}>
                  {/* //save */}
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 34.875 34.875">
  <path id="Icon_awesome-check-circle" data-name="Icon awesome-check-circle" d="M35.438,18A17.438,17.438,0,1,1,18,.563,17.437,17.437,0,0,1,35.438,18ZM15.983,27.233,28.921,14.3a1.125,1.125,0,0,0,0-1.591L27.33,11.114a1.125,1.125,0,0,0-1.591,0L15.188,21.665l-4.926-4.926a1.125,1.125,0,0,0-1.591,0L7.079,18.329a1.125,1.125,0,0,0,0,1.591l7.313,7.313a1.125,1.125,0,0,0,1.591,0Z" transform="translate(-0.563 -0.563)"/>
</svg>

                </button>
              </>
            ) : (
              <>
              
                <button onClick={() => {
                  setEditModeIndex(index);
                  setEditedTabName({ tabname: tab.tabname });
                }}>
                  {/* //edit */}
                  <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 30 28.682">
  <g id="Icon_feather-edit-3" data-name="Icon feather-edit-3" transform="translate(-3 -2.818)">
    <path id="Path_10" data-name="Path 10" d="M18,30H31.5" fill="transparent" stroke-linecap="round"  stroke-linejoin="round" stroke-width="3"/>
    <path id="Path_11" data-name="Path 11" d="M24.75,5.25a3.182,3.182,0,0,1,4.5,4.5L10.5,28.5,4.5,30,6,24Z"  fill="transparent"  stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
  </g>
</svg>

              </button>
                <button className="over" onClick={() => handleDeleteTab(index)}>
                  {/* //delete */}

                  {/* <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 36 27">
  <g id="Icon_feather-delete" data-name="Icon feather-delete" transform="translate(0 -4.5)">
    <path id="Path_12" data-name="Path 12" d="M31.5,6H12L1.5,18,12,30H31.5a3,3,0,0,0,3-3V9A3,3,0,0,0,31.5,6Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    <path id="Path_13" data-name="Path 13" d="M27,13.5l-9,9" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    <path id="Path_14" data-name="Path 14" d="M18,13.5l9,9" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
  </g>
</svg> */}
<svg className='svgDelete' width="15" height="15" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    <g id="Page-1"  fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" >
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]">
</path>
            </g>
        </g>
    </g>
</svg>


                </button>
              
              </>
            )}

            </div>


          </div>

        ))}
       
      </ul>
    </div>
  );
}

export default Sidebar;
