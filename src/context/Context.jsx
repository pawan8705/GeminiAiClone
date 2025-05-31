import run from '../conflig/Gemini'
import { createContext, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext();

const ContextProvider = (props) =>{
  const [input,setInput] = useState("");
  const [recentPrompt,setRecentPrompt] = useState("");
  const [prePromt,setPrePrompt] = useState([]);
  const [showResult,setShowResult] = useState(false);
  const [loading,setLoading] = useState(false);
  const [resultData,setResultData] = useState(false);

  const delaypara = (index,nextword)=>{
    setTimeout(function(){
      setResultData((prev)=>prev+nextword);
    },75*index)
  }
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    // setInput("");
    // setRecentPrompt("");
  }

  const onSent = async(prompt) =>{
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    if(prompt !== undefined){
        response = await run(prompt);
        setRecentPrompt(prompt)
    }else{
      setPrePrompt((prev)=>[...prev,input]);
      setRecentPrompt(input);
      response = await run(input);
    }
    let responseArray = response.split("**");
    let newResponse='';
    for(let i=0;i<responseArray.length;i++){
      if(i==0 || i%2 !==1){
        newResponse += responseArray[i];
      }
      else{
        newResponse += "<b>" + responseArray[i]+"</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArray = newResponse2.split(" ");
    for(let i=0;i<newResponseArray.length;i++){
      const nextWord = newResponseArray[i];
      delaypara(i,nextWord+" ")
    }
    setLoading(false);
    setInput("")
  };
  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prePromt,
    setPrePrompt,
    showResult,
    loading,
    resultData,
    onSent,
    newChat
  }
  return(
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;
