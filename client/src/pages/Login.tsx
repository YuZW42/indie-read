import  { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {BsArrowLeftCircle} from "react-icons/bs"

import NavBar from "../components/shared/NavBar";

import "../components/login/module.login.css";

export const Login = () => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };
  const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
      setUploadedFileName(inputRef.current.files[0].name);
  };

  return (
    <div className="form-container">
      <div>
        <a href="/"><BsArrowLeftCircle className="back-arrow"/></a>
        <NavBar />
      </div>

      <div className="form-input-container">
        <h1>Post An ArtBook</h1>

        <Form>
          <Form.Group>
            <div className="m-3">
              <label className="mx-3">Choose file:</label>
              <input
                ref={inputRef}
                onChange={handleDisplayFileDetails}
                className="d-none"
                type="file"
              />
              <button
                onClick={handleUpload}
                className={`btn btn-outline-${
                  uploadedFileName ? "success" : "primary"
                }`}
              >
                {uploadedFileName ? uploadedFileName : "Upload"}
              </button>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
