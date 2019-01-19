import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextInput from '../../common/TextInput';

class CategoryForm extends React.Component {
  constructor(props, context) {
    super (props, context);
    this.state = {
      categoryId: props.data.categoryId,
      name: props.data.name
    }
  } 

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    data: PropTypes.object,
    saveResult: PropTypes.object
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.data.categoryId !== prevState.categoryId &&         
        nextProps.data.name !== prevState.name) {
      return { 
        categoryId: nextProps.data.categoryId,
        name: nextProps.data.name
      };
    } 
    else {
     return null;
    } 
  }
  
  onNameChange = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    this.setState({
      name: evt.target.value
    });
  }

  onClickSave = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    let category = {
      name: this.state.name
    };

    // clean state
    this.setState({
      categoryId: 0,
      name: ''
    });
    this.props.onSave(category);
  }

  displayErrors = () => {
    if (!this.props.saveResult.success) {
      return (
        <div className="alert alert-warning">
          <ul>
            {this.props.saveResult.errors.map((error, index) => {
              return (
                <li key={index}>{error}</li>
              );
            })}
          </ul>
        </div>
      );    
    } 
  }

  render() {
    return (
      <div>
        {this.displayErrors()}
        <form>
          <TextInput name="inputCategory" label="Name:" 
            placeholder="type category name"
            onChange={this.onNameChange}
            value = {this.state.name}
            key= {this.state.categoryId} />
          <div className="form-group row">
            <div className="col-8 offset-1">
              <button type="submit" className="btn btn-primary" onClick={this.onClickSave}>Save</button>
              <Link to="/category" className="btn btn-info" style={{marginLeft: '20px'}}>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CategoryForm;
