import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';
import categoryActions from '../../../actions/categoryActions'

class NewCategory extends React.Component {
  constructor(props, context) {
    super (props, context);

    this.state = {
      category: {  
        id: null,
        name: '' 
      }
    };

    this.onSave = this.onSave.bind(this);
  }

  static propTypes = {
    category: PropTypes.object,
    actions: PropTypes.object.isRequired
  }

  onSave(category) {
    console.log('title', category.name);
    this.props.actions.createCategory(category);
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
        <CategoryForm onSave={this.onSave} />
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
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCategory);