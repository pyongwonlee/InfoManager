import React from 'react';
import PropTypes from 'prop-types';
import CategoryRow from './CategoryRow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import categoryActions from '../../../actions/categoryActions'

class CategoryList extends React.Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired,
    categories: PropTypes.array
  }

  componentDidMount() {
    this.props.actions.getCategories();
  }

  render() {
    const {isLoading, totalCount, categories} = this.props;

    if (isLoading) {
      return (
        <div>
          <i className="fas fa-spinner"></i> Loading ...
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 offset-1">
              <h2>Categories</h2>
              <p className="text-info">(Total Count: {totalCount})</p>              
              <hr />
            </div>
          </div>
          <div className="row create-row">
            <div className="col-5 offset-1">
              <Link className="btn btn-primary" to="/category/0">Create a New Category</Link>
            </div>
          </div>
          { categories.map((category, index) =>
              <CategoryRow category={category} key={index} />)
          }
        </div>  
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoryList.categories,
    totalCount: state.categoryList.totalCount,
    isLoading: state.categoryList.isLoading
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
)(CategoryList);