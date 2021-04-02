# Board_Infinity

# terriblyTinyTales
Insert and Fetch Data using node js Back-end &amp; Display records on react js front-end.

[![CircleCI](https://circleci.com/gh/cezerin/cezerin/tree/master.svg?style=svg)](https://circleci.com/gh/cezerin/cezerin/tree/master)

Built with:
* React.js


## FrontEnd

React Snippets

```js
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
 ```

On entering the artist name and pressing submit, a request should be sent through user access token
and get n number of details and listen to songs.
```js


 function submit(e){
      e.preventDefault();

      if(data!==""){
      const BASE_URL='https://api.spotify.com/v1/search?';
      let FETCH_URL =BASE_URL+'q='+data+'&type=artist&limit=1';
      const userAccessToken="Bearer BQCzHpPEFyFIm0BjXBWMzqSILCAoezkbjov7n-31PLRqCnPXE-xfSb9sDVLR_ucijGWIO60aTJs02Hmkp5FaX4aL4oEXv3NrqYYhsjE1vAVHF91dfFj1CQucdWoQOshb3S54sGGJwLkVE9eXfp8sqeSW26KXPmzfdMfiWpuDg84wTwmid2gB_sHaknF35KQNfOIpikwmzY6Pa_siOFAiy7MD7603kxE";
    
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

    

```

display the record.
```js
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

```


if user donot enter anything in input field, it generates alert
```js
import React from "react";

const Alert = ({ alert }) => {
  return (
    <div className="alert">
      <h3>{alert}</h3>
    </div>
  );
};

export default Alert;



```



Addititional Information

```js
<ul className="ingredient-list" >
    <li className="ingredient-text">Album-Type : {val.album.album_type}</li>
      <li className="ingredient-weight"><h4>{val.artists[0].type} : {val.artists[0].name}</h4></li>
      <li className="ingredient-text">Popularity : {val.popularity}</li>
      <li className="ingredient-weight"><a href=
        {val.artists[0].external_urls.spotify} 
        target="_blank" rel="noopener noreferrer" >
        URL</a></li>
      <li className="ingredient-text">Release Date : {val.album.release_date}</li>
      </ul>
    // </div>



```




