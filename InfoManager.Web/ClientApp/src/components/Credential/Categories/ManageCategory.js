import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';
import categoryActions from '../../../actions/categoryActions'

class ManageCategory extends React.Component {
  constructor(props, context) {
    super (props, context);
    this.state = {
      categoryId: this.props.match.params.id,
      isBeingUpdated: this.props.match.params.id > 0
    }
  }

  static propTypes = {
    category: PropTypes.object,
    createCategoryData: PropTypes.object,
    updateCategoryData: PropTypes.object,
    actions: PropTypes.object.isRequired,
    match: PropTypes.any
  }

  componentDidMount() {
    this.props.actions.getCategory(this.state.categoryId);
  }

  onSave = (category) => {
    if (this.state.isBeingUpdated) {
      this.props.actions.updateCategory(this.state.categoryId, category);
    } else {
      this.props.actions.createCategory(category);
    }
  }

  getTitle = () => {
    return (this.state.isBeingUpdated) ? `Edit Category: ${this.props.category.name}` : "Create Category";
  }

  render () {
    let categoryData = (this.state.isBeingUpdated) ?
      this.props.category :
      {  
        categoryId: 0,
        name: '',
        companies: []
      };

    let saveResult = {
      success: this.props.success,
      errors: this.props.errors
    };
    
    if (this.props.isLoading) {
      return (
        <div>
          <i className="fas fa-spinner"></i> Loading ...
        </div>
      );
    } else {
      return (
        <div className="container-fluid new-category-form">
          <div className="row">
            <div className="col-10 offset-1">
              <h2>{this.getTitle()}</h2> 
              <hr />
            </div>
          </div>
          <CategoryForm data={categoryData} saveResult={saveResult} onSave={this.onSave} />
        </div>
      );
    }   
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.categoryData.category,
    success: state.categoryData.success,
    errors: state.categoryData.errors,
    isLoading: state.categoryData.isLoading,
    actionSuccess: state.categoryActions.success,
    actionErrors: state.categoryActions.errors
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
)(ManageCategory);
