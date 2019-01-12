import React from 'react';
import { Link } from 'react-router-dom';

class CategoryForm extends React.Component {
  constructor(props, context) {
    super (props, context);
    
    this.nameInputRef = React.createRef();
    this.onClickSave = this.onClickSave.bind(this);
  }
  
  onClickSave = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    let category = {
      name: this.nameInputRef.current.value
    };
    this.props.onSave(category);
  }

  render() {
    return (
      <form>
        <div className="form-group row">
          <label htmlFor="inputCategory" className="col-2 offset-1 col-form-label">Name:</label>
          <div className="col-8">
            <input type="text" className="form-control" id="inputCategory" ref={this.nameInputRef} placeholder="Category Name" />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-8 offset-1">
            <button type="submit" className="btn btn-primary" onClick={this.onClickSave}>Create</button>
            <Link to="/category" className="btn btn-info" style={{marginLeft: '20px'}}>Cancel</Link>
          </div>
        </div>
      </form>
    );
  }
}

export default CategoryForm;