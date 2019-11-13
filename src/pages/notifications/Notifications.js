import React from 'react';
import {
  Row, Col, Button,
} from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid/v4'
import Widget from '../../components/Widget';
import s from './Notifications.module.scss';

class Notifications extends React.Component {
  
  state = {
    options: {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true
    }
  }

  componentDidMount() {
    toast.success('Thanks for checking out Messenger!', {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  }

  addSuccessNotification = () => toast.success('Showing success message was successful!', this.state.options);

  toggleLocation = (location) => {
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        position: location
      }
    }));
  }
 
  addInfoNotification = () => {
    let id = uuid();
    toast.info( 
    <div className="d-flex flex-column align-items-center">
      Launching thermonuclear war...
      <Button onClick={() => this.launchNotification(id)} outline color="default" size="sm" className="width-100 mb-xs mr-xs mt-1 ml-4">Cancel launch</Button>
    </div>, 
    {...this.state.options,toastId: id},
    );
  }
 
  launchNotification = (id) => toast.update(id, { ...this.state.options, render: "Thermonuclear war averted", type: toast.TYPE.SUCCESS });
 
  addErrorNotification = () => {
    let id = uuid();
    toast.error(
    <div className="d-flex flex-column align-items-center">
      Error destroying alien planet
      <Button onClick={() => this.retryNotification(id)} outline color="default" size="sm" className="width-100 mb-xs mr-xs mt-1 ml-4">Retry</Button>
    </div>, 
    {...this.state.options,toastId: id}
    );
  } 

  retryNotification = (id) =>  toast.update(id, {...this.state.options, render: 'Alien planet destroyed!', type: toast.TYPE.SUCCESS });
  
  render() {
    return (
      <div className={s.root}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">YOU ARE HERE</li>
          <li className="breadcrumb-item active">UI Notifications</li>
        </ol>
        <h1 className="page-title">Messages - <span className="fw-semi-bold">Notifications</span>
        </h1>

        <Widget title={<h6> Messenger </h6>} close collapse settings>
          <Row>
            <Col lg="4" xs="12">
              <h5 className="m-t-1">Layout options</h5>
              <p>There are few position options available for notifications. You can click any of
                them
                to change notifications position:</p>
              <div className="location-selector">
                <div
                  className="bit top left" onClick={() => {
                    this.toggleLocation('top-left');
                  }}
                />
                <div
                  className="bit top right" onClick={() => {
                    this.toggleLocation('top-right');
                  }}
                />
                <div
                  className="bit top" onClick={() => {
                    this.toggleLocation('top-center');
                  }}
                />
                <div
                  className="bit bottom left" onClick={() => {
                    this.toggleLocation('bottom-left');
                  }}
                />
                <div
                  className="bit bottom right" onClick={() => {
                    this.toggleLocation('bottom-right');
                  }}
                />
                <div
                  className="bit bottom" onClick={() => {
                    this.toggleLocation('bottom-center');
                  }}
                />
              </div>
            </Col>

            <Col lg="4" xs="12">
              <h5 className="m-t-1">Notification Types</h5>
              <p>Different types of notifications for lost of use cases. Custom classes are also
                supported.</p>
              <p><Button color="info" id="show-info-message" onClick={this.addInfoNotification}>Info
                Message</Button></p>
              <p><Button color="danger" id="show-error-message" onClick={this.addErrorNotification}>Error
                + Retry Message</Button></p>
              <p><Button
                color="success" id="show-success-message" onClick={this.addSuccessNotification}
              >Success
                Message</Button></p>
            </Col>

            <Col lg="4" xs="12">
              <h5 className="m-t-1">Dead Simple Usage</h5>
              <p>Just few lines of code to instantiate a notifications object. Does not require
                passing any options:</p>
              <pre><code>{'toast("Thanks for checking out Messenger!");'}</code></pre>
              <p>More complex example:</p>
              <pre>
                <code>{'\ntoast.success( \'There was an explosion while processing your request.\', { \n position: location,\n autoClose: 5000, \n hideProgressBar: false, \n closeOnClick: true,\n pauseOnHover: true, \n draggable: true \n});\n\n'}
                </code>
              </pre>
            </Col>
          </Row>
        </Widget>
      </div>
    );
  }
}

export default Notifications;
