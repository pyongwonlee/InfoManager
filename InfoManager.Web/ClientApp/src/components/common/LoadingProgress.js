import React from 'react';
import PropTypes from 'prop-types';

class LoadingProgress extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      frame: 1
    }
  }

  static propTypes = {
    interval: PropTypes.number,
    dots: PropTypes.number
  }

  static defaultProps = {
    interval: 300,
    dots: 3
  };

  componentDidMount() {
    this.interval = setInterval(() => 
      this.setState({
        frame: this.state.frame + 1
      })
      , this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = (this.state.frame % this.props.dots) + 1;
    let text = '';
    while(dots > 0) {
      text += '.';
      dots--;
    }
    return(
      <div className="alert alert-warning text-center">
        <i className="fas fa-spinner"></i> Loading {text}
      </div>
    );
  }
}

export default LoadingProgress;