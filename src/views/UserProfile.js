import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { authentication } from "features/auth/authState";

function UserProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postal, setPostal] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [img, setImg] = useState("");

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/auth/${user.id}`);
      if (response.status === 200) {
        const { data } = response;
        setUsername(data.name);
        setEmail(data.email);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAddress(data.address);
        setCity(data.city);
        setCountry(data.country);
        setPostal(data.postalCode);
        setAboutMe(data.aboutMe);
      }
    };

    fetchData();
  }, [user]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.put(`http://localhost:4000/auth/${user.id}`, {
      name: username !== "" ? username : user.name,
      email: email !== "" ? email : user.email,
      firstname: firstname !== "" ? firstname : user.firstname,
      lastname: lastname !== "" ? lastname : user.lastname,
      address: address !== "" ? address : user.address,
      city: city !== "" ? city : user.city,
      country: country !== "" ? country : user.country,
      postalCode: postal !== "" ? postal : user.postal,
      aboutMe: aboutMe !== "" ? aboutMe : user.aboutMe,
    });

    if (response.status === 200) {
      dispatch(authentication(response.data));
      return response.data;
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onHandleSubmit}>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          placeholder="Username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          placeholder="First Name"
                          type="text"
                          value={firstname}
                          onChange={(e) => {
                            setFirstname(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          placeholder="Last Name"
                          type="text"
                          value={lastname}
                          onChange={(e) => {
                            setLastname(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          placeholder="Home Address"
                          type="text"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          placeholder="City"
                          type="text"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          placeholder="Country"
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value);
                          }}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input
                          placeholder="ZIP Code"
                          type="number"
                          value={postal}
                          onChange={(e) => {
                            setPostal(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          cols="80"
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                          value={aboutMe}
                          onChange={(e) => {
                            setAboutMe(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button className="btn-fill" color="primary" type="submit">
                    {/* {isLoading ? "Saving..." : "Save"} */}
                    Save
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <div className="input-file-img">
                      {/* <img
                      alt="..."
                      className="avatar"
                      src={require("../assets/img/default-avatar.png")}
                    /> */}
                      <input type="file" />
                    </div>
                    <h5 className="title">
                      {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                    </h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">{aboutMe}</div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
