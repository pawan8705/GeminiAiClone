import {useContext } from 'react';
import {assets} from '../../assets/assets';
import SendIcon from '@mui/icons-material/Send'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import MicIcon from '@mui/icons-material/Mic'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import './Main.css';
import { Context } from '../../context/Context';

const Main = () => {
  const {input,setInput,recentPrompt,showResult,loading,resultData,onSent} = useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <p><span id='logo'>GEMINI AI</span></p>
        <AccountCircleIcon className='user' />
      </div>
      <div className="main-container">
        { !showResult ?
        <>        
          <div className="greet">
            <p><span>Hello, Pawan</span></p>
            <p id='Help'>How can I help you today ?</p>
          </div>
        </>:
        <div className='result'>
          <div className="result-title">
            <AccountCircleIcon className='useicon'/>
            <p className='question'>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />

            {loading?<div className='loader'>
              <div className="load"></div>
              <div className="load"></div>
              <div className="load"></div>
              <div className="load"></div>
            </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
          </div>
        </div>}
        <div className="main-bottom">
          <div className="search-box">
            <input type="text" placeholder='Enter a prompt here...' onChange={(e)=>setInput(e.target.value)} value={input} />
            <div>
              <ImageSearchIcon className="Icons" />
              <MicIcon className="Icons" />
              {input?<SendIcon className="Icons" onClick={()=>onSent()}/>:null}
            </div>
          </div>
          <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.</p>
        </div>
      </div>
    </div>
  )
}

export default Main
