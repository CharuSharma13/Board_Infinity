import React from 'react';

const Info = ({val})=>{
  
  return (
    // <div className="in-list">
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
    
    );
}


export default Info;