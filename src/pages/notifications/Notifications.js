import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row, Col, Button, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
/* eslint-disable */
import 'imports-loader?$=jquery,this=>window!jquery';
import 'imports-loader?$=jquery,this=>window!messenger/build/js/messenger';
/* eslint-enable */

import Widget from '../../components/Widget';

import s from './Notifications.scss';

// todo @franckeeva what about server side rendering? this will fail unless launched as lazy route
const {Messenger} = window;

/* eslint-disable */
function initializationMessengerCode() {
  (function () {
    let $,
      FlatMessage,
      spinner_template,
      __hasProp = {}.hasOwnProperty,
      __extends = function (child, parent) {
        for (const key in parent) {
          if (__hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      };

    $ = jQuery;

    spinner_template = '<div class="messenger-spinner">\n    <span class="messenger-spinner-side messenger-spinner-side-left">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n    <span class="messenger-spinner-side messenger-spinner-side-right">\n        <span class="messenger-spinner-fill"></span>\n    </span>\n</div>';

    FlatMessage = (function (_super) {
      __extends(FlatMessage, _super);

      function FlatMessage() {
        return FlatMessage.__super__.constructor.apply(this, arguments);
      }

      FlatMessage.prototype.template = function (opts) {
        let $message;
        $message = FlatMessage.__super__.template.apply(this, arguments);
        $message.append($(spinner_template));
        return $message;
      };

      return FlatMessage;
    }(Messenger.Message));

    Messenger.themes.air = {
      Message: FlatMessage,
    };
  }).call(window);
}
/* eslint-enable */

class Notifications extends React.Component {
  constructor() {
    super();
    this.addSuccessNotification = this.addSuccessNotification.bind(this);
    this.addInfoNotification = this.addInfoNotification.bind(this);
    this.addErrorNotification = this.addErrorNotification.bind(this);
    this.toggleLocation = this.toggleLocation.bind(this);
    this.state = {
      locationClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    };
  }


  componentDidMount() {
    initializationMessengerCode();
    Messenger.options = {
      extraClasses: this.state.locationClasses,
      theme: 'air',
    };
    Messenger().post('Thanks for checking out Messenger!');
  }

  addSuccessNotification() {
    Messenger().post({
      extraClasses: this.state.locationClasses,
      message: 'Showing success message was successful!',
      type: 'success',
      showCloseButton: true,
    });
    return false;
  }

  addInfoNotification() {
    const msg = Messenger().post({
      extraClasses: this.state.locationClasses,
      message: 'Launching thermonuclear war...',
      actions: {
        cancel: {
          label: 'cancel launch',
          action: () => msg.update({
            message: 'Thermonuclear war averted', type: 'success', actions: false,
          }),
        },
      },
    });

    return false;
  }

  addErrorNotification() {
    let i = 0;
    Messenger().run({
      errorMessage: 'Error destroying alien planet',
      successMessage: 'Alien planet destroyed!',
      extraClasses: this.state.locationClasses,
      action(opts) {
        /* eslint-disable */
        if (++i < 3) {
          return opts.error({
            status: 500,
            readyState: 0,
            responseText: 0,
          });
        }
        /* eslint-enable */
        return opts.success();
      },
    });
  }

  toggleLocation(vertical = 'top', horizontal = '') {
    let className = `messenger-fixed messenger-on-${vertical}`;
    className += (horizontal === '') ? '' : ` messenger-on-${horizontal}`;
    this.setState({
      locationClasses: className,
    });
    Messenger.options = {
      extraClasses: className,
      theme: 'air',
    };
    Messenger();
  }

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>UI Notifications</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title mb-lg">Messages - <span className="fw-semi-bold">Notifications</span>
        </h1>

        <Widget title={<h6> Messenger </h6>} close collapse settings>
          <Row>
            <Col lg="4" xs="12">
              <h5 className="m-t-1">Layout options</h5>
              <p>There are few position options available for notifications. You can click any of
                them
                to change notifications position:</p>
              <div className="location-selector">
                { /* eslint-disable */}
                <div
                  className="bit top left" onClick={() => {
                    this.toggleLocation('top', 'left');
                  }}
                />
                <div
                  className="bit top right" onClick={() => {
                    this.toggleLocation('top', 'right');
                  }}
                />
                <div
                  className="bit top" onClick={() => {
                    this.toggleLocation('top', '');
                  }}
                />
                <div
                  className="bit bottom left" onClick={() => {
                    this.toggleLocation('bottom', 'left');
                  }}
                />
                <div
                  className="bit bottom right" onClick={() => {
                    this.toggleLocation('bottom', 'right');
                  }}
                />
                <div
                  className="bit bottom" onClick={() => {
                    this.toggleLocation('bottom', '');
                  }}
                />
                { /* eslint-enable */}
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
              <pre><code>Messenger().post(&quot;Thanks for checking out Messenger!&quot;);</code></pre>
              <p>More complex example:</p>
              <pre>
                <code>{'\nMessenger().post({\n  message: \'There was an explosion while processing your request.\',\n  type: \'error\',\n  showCloseButton: true\n});\n\n'}
                </code>
              </pre>
            </Col>
          </Row>
        </Widget>
      </div>
    );
  }
}

export default withStyles(s)(Notifications);
