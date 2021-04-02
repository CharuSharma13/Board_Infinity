import './App.css';
import React,{useState} from 'react';
import axios from 'axios';

import Alert from './components/Alert';
import Info from './components/Info';

function App() {

    
    const [data,setData]=useState("");
    const [track,setTrack]=useState([]);
    const [state,setAudio]=useState({
      playingUrl:'',
      audio:null,
      playing:false
    });
    const [alert,setAlert]=useState("");
    const [show,setShow]=useState(false);

    function handle(e){
        setData(e.target.value)      
    }
    function submit(e){
      e.preventDefault();

      if(data!==""){
      const BASE_URL='https://api.spotify.com/v1/search?';
      let FETCH_URL =BASE_URL+'q='+data+'&type=artist&limit=1';
      const userAccessToken="Bearer BQCC4TFMW4hhEV8I7d7Ua3FgrPphfgC9xGaBTtUSPG1SzAMkZIBrUo4CEwxiVV4RsqRYVp7sitVNiFmPSWN_7R6UEbheuwqWssDo-XiZzBDqMCnIrHa2IrZvQGTCb3s50qgJUpCOpyX9LMsKf2bLiO8ZqP1dd3Dy_wcvN-crK6Z9SAwEKOwA0CAVu8ZrE0tDXTUwRrjIHBQ731j0_Tqz9NeDfNyxP_0";
    
      const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
      axios(FETCH_URL, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : userAccessToken ,     
      },
      
      method: 'GET'
    })

    .then(response =>response.data)
    .then(art=>art.artists)
    .then(item_id=>{
      const artist=item_id.items[0];
      setData(artist);
      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      axios(FETCH_URL, {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : userAccessToken ,     
      },
      
      method: 'GET'
    })

      .then(response=>{
        console.log(response.data.tracks);
        setTrack(response.data.tracks);
      }).catch(err=>{
        console.log(err);
      })

       setData("");
       setAlert("");
      
    })
   
  }
  else{
    setAlert("Write SOMETHING !! ");
  }
   
  };
    
  function playAudio(previewUrl){
  let audio= new Audio(previewUrl);
  if(!state.playing){
      audio.play();
      setAudio({
        playing:true,
        playingUrl:previewUrl,
        audio
      })
    }
    else{
      if(state.playingUrl === previewUrl){
        state.audio.pause();
        setAudio({
          playing: false
        })
      }
      else{
        state.audio.pause();
        audio.play();
        setAudio({
          playing:true,
          playingUrl:previewUrl,
          audio
        })
      }
    }
  }

    


    
  return (
    <div className="App">
    <h1>PLAYLIST</h1>
    <form className="search-form" onSubmit={(e)=>submit(e)}>
    {alert !== "" && <Alert alert={alert} />}
    <input id="name" type="text" 
    onChange={(e)=>handle(e)} value={data} placeholder="artist name eg Shakira" autocomplete="off"/>
    <button className="btun" type="submit" >Submit</button>
    </form>

    <div className="recipes">
    {

      track!==[] && track.map(

        val=><div className="recipe">
        <h2>{val.name}</h2>

        <img className="ite" src={val.album.images[0].url} alt={val.name} 
          
        />
       
        
        <button id="cont" onClick={()=>{
          playAudio(val.preview_url)
          
        }} >PLAY  &  PAUSE</button>
        
      

        <button onClick={() => setShow(!show)}>More Information</button>
      {show && <Info val={val} />}
        </div>

        )
    }
    </div>
    </div>
  );
}






export default App;














