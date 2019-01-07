import React from 'react';
import PropTypes from 'prop-types';
import CategoryForm from './CategoryForm';

class NewCategory extends React.Component {
  constructor(props, context) {
    super (props, context);

    this.state = {
      category: {  
        id: null,
        name: '' 
      }
    };

    this.nameInputRef = React.createRef();
    this.createCategory = this.createCategory.bind(this);
  }

  createCategory(evt) {
    if (evt) {
      evt.preventDefault();
    }
    const category = this.state.category;
    category.title = this.nameInputRef.current.value;
    console.log('title', this.nameInputRef.current.value);
  }

  render () {
    return (
      <div className="container-fluid new-category-form">
        <div className="row">
          <div className="col-10 offset-1">
            <h2>New Category</h2>         
            <hr />
          </div>
        </div>
        <CategoryForm onSave={this.createCategory} ref={this.nameInputRef} />
      </div>
    );
  }
}

export default NewCategory;