import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';

import "../../styles/pages/resources.css"


import SelectionBar from './SelectionBar';
import resources from './ResourceType';

const ResourceList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  }

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(resource => resource.type.includes(selectedCategory));

  return (
    <div>
      <h1 id='topic'>Resources</h1>
      <SelectionBar selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
      <Container fluid>
      <Accordion defaultActiveKey="0" flush>
        <div>
          {filteredResources.map((resource, index) => (
            <Accordion.Item key={index} eventKey={`${index}`}>
              <Accordion.Body>
                <a href={resource.url}  target="_blank"><strong>{resource.name} </strong></a>
              </Accordion.Body>
            
              <Accordion.Body>{resource.caption}</Accordion.Body>
              
                {resource.type.split(';').map((label, index) => (
                  <Accordion.Button><span key={index} className="label">{label}</span></Accordion.Button>
                ))}

            </Accordion.Item>
          ))}
        </div>
      </Accordion>
      
      <Button variant="primary" id='news'>News Feed</Button>
      </Container>
    </div>
  );
};

export default ResourceList;
