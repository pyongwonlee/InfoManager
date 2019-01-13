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

    this.onSave = this.onSave.bind(this);
    this.getTitle = this.getTitle.bind(this);
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

  onSave(category) {
    console.log('title', category.name);
    if (this.state.isBeingUpdated) {
      this.props.actions.updateCategory(this.state.categoryId, category);
    } else {
      this.props.actions.createCategory(category);
    }
  }

  getTitle() {
    return (this.props.match.params.id > 0) ? "Edit Category" : "Create Category";
  }

  render () {
    let saveResult = (this.state.isBeingUpdated) ?
      this.props.updateCategoryData :
      this.props.createCategoryData;

    return (
      <div className="container-fluid new-category-form">
        <div className="row">
          <div className="col-10 offset-1">
            <h2>{this.getTitle()}</h2>         
            <hr />
          </div>
        </div>
        <CategoryForm data={this.props.category} saveResult={saveResult} onSave={this.onSave} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.categoryData.category,
    createCategoryData: state.categoryCreate,
    updateCategoryData: state.cateoryUpdate
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
