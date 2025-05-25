import { useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import './Sidebar.css';
import { Context } from '../../context/Context';

const Sidebar = () => {

  const [extended, setExtended] = useState(false);
  const{onSent,prePromt,setRecentPrompt,newChat} = useContext(Context);

  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className='Sidebar'>
      <div className="top">
        <MenuIcon  onClick={()=>setExtended(prev=>!prev)} className='menu'></MenuIcon>
        <div className="new-chat" onClick={()=>newChat()}>
          <AddCircleOutlineIcon className='plus'></AddCircleOutlineIcon>
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ?
          <div className="recent">
            <p className="recent-title">Recent...</p>
            {prePromt.map((item,index)=>{
              return(
                  <div onClick={()=>loadPrompt(item)} key={index} className="recent-entry">
                    <MessageOutlinedIcon/>
                    <p>{item.slice(0,18)} ...</p>
                  </div>
              )
            })}
          </div>:null       
      }   
      </div>
      <div className="bottom">
        <div className="botton-item recent-entry">
          <HelpOutlineIcon />
          {extended?<p>Help</p>:null}
        </div>
        <div className="botton-item recent-entry">
          <HistoryIcon />
          {extended?<p>Activity</p>:null}
        </div>
        <div className="botton-item recent-entry">
          <SettingsIcon/>
          {extended?<p>Setting</p>:null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar