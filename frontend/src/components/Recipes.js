import React from 'react';
const Recipes = ({val})=>{

  return (
    <div>
      <h2>{val.name}</h2>
      <h2>{val.artists[0].external_urls.spotify}</h2>
      
    </div>
    )
}

export default Recipes;