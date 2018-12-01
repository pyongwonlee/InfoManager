import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';

export default props => (
  <Grid fluid>
    <Row>
      <Col sm={3}>
        <NavMenu />
      </Col>
      <Col sm={9}>
        {props.children}
        <hr />
        <p>&copy; 2018 - Personal Information Management by P. Lee</p>
      </Col>
    </Row>
  </Grid>
);
