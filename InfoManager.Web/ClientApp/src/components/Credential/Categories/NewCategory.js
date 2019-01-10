import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';
import { createCategory } from '../../../actions/categoryActions'

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
    this.onClickSave = this.onClickSave.bind(this);
  }

  static propTypes = {
    category: PropTypes.object,
    createCategory: PropTypes.func.isRequired
  }

  onClickSave(evt) {
    if (evt) {
      evt.preventDefault();
    }
    let category = {
      name: this.nameInputRef.current.value
    };
    console.log('title', category.name);

    this.props.createCategory(category);
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
        <CategoryForm onSave={this.onClickSave} ref={this.nameInputRef} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.category
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCategory}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCategory);