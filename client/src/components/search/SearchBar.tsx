import React, {useState} from 'react';

const ResourceList =()=>{
  


  return(
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search resources..."
      />

      {filteredResources.map((resource, index) => (

      ))}
    </div>
  );
}