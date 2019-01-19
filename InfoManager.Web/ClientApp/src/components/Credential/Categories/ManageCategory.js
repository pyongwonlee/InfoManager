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
    if (this.state.isBeingUpdated) {
      this.props.actions.getCategory(this.state.categoryId);
    }
  }

  handleResult = () => {
    if (this.props.actionSuccess) {
      this.context.router.history.push('/category');
    } 
  };

  onSave = (category) => {
    if (this.state.isBeingUpdated) {
      this.props.actions.updateCategory(this.state.categoryId, category)
        .then(() => this.handleResult())
    } else {
      this.props.actions.createCategory(category)
        .then(() => this.handleResult());
    }
  }

  getTitle = () => {
    return (this.state.isBeingUpdated) ? `Edit Category: ${this.props.category.name}` : "Create Category";
  }

  render () {

    let categoryData = this.props.category;
    let saveResult = {
      success: this.props.success,
      errors: this.props.errors
    };

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

const mapStateToProps = (state, ownProps) => {
  const categoryId = ownProps.match.params.id;

  let category =  {  
    categoryId: 0,
    name: '',
    companies: []
  };
  if (categoryId > 0) {
    category = Object.assign({}, state.categoryData.category);
  } 

  return {
    category: category,
    success: state.categoryData.success,
    errors: state.categoryData.errors,
    actionSuccess: state.categoryActions.success,
    actionErrors: state.categoryActions.errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(categoryActions, dispatch)
  };
};

ManageCategory.contextTypes = {
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCategory);
