import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';
import categoryActions from '../../../actions/categoryActions';
import toastr from 'toastr';

class ManageCategory extends React.Component {
  constructor(props, context) {
    super (props, context);
    this.state = {
      categoryId: this.props.match.params.id,
      isBeingUpdated: this.props.match.params.id > 0,
      saving: false
    };
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
    this.setState({saving: false});
    toastr.success('The Category has been saved.');
    this.context.router.history.push('/category');
  };
  handleError = (error) => {    
    this.setState({saving: false});
    toastr.error(error.message);
  }

  onSave = (category) => {
    this.setState({saving: true});
    if (this.state.isBeingUpdated) {
      this.props.actions.updateCategory(this.state.categoryId, category)
        .then(() => this.handleResult())
        .catch(error => this.handleError(error));
    } else {
      this.props.actions.createCategory(category)
        .then(() => this.handleResult())
        .catch(error => this.handleError(error));      
    }
  }

  getTitle = () => {
    return (this.state.isBeingUpdated) ? `Edit Category: ${this.props.category.name}` : 'Create Category';
  }

  render () {

    let categoryData = this.props.category;

    return (
      <div className="container-fluid new-category-form">
        <div className="row">
          <div className="col-10 offset-1">
            <h2>{this.getTitle()}</h2> 
            <hr />
          </div>
        </div>
        <CategoryForm data={categoryData} onSave={this.onSave} saving={this.state.saving} />
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
