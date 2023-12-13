import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import resourcetype from './ResourceType';
import "./module.resources.css"

import SelectionBar from './SelectionBar';
import  Resource from './ResourceInterface'



const ResourceList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [resourceData, setResourceData] = useState<Resource[]>([]); // Changed the state variable name to 'resourceData'

  useEffect(() => {
    const fetchResources = async () => {
      const data: Resource[] = await resourcetype();
      setResourceData(data); // Changed to setResourceData
    };

    fetchResources();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  }

  const filteredResources = selectedCategory === 'All'
    ? resourceData
    : resourceData.filter(resource => resource.type.includes(selectedCategory));

  return (
    <div>
      <h1 id='topic'>Resources</h1>
      <SelectionBar selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
      <Container fluid>
        <Accordion defaultActiveKey="0" flush>
          <div>
            {filteredResources.map((resource, index) => (
              <Accordion.Item key={index} eventKey={`${index}`}>
                <Accordion.Header>
                  <a href={resource.url}  target="_blank"><strong>{resource.name} </strong></a>
                </Accordion.Header>
              
                <Accordion.Body>{resource.caption}</Accordion.Body>
                  
                {/* {resource.type.split(';').map((label, index) => (
                  <Accordion.Button key={index}><span className="label">{label}</span></Accordion.Button>
                ))} */}

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
