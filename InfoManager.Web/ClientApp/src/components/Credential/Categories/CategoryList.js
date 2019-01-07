import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCategories } from '../../../actions/categoryActions'

class CategoryList extends React.Component {

  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired,
    categories: PropTypes.array
  }

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    if (this.props.isLoading) {
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
              <p className="text-info">(Total Count: {this.props.totalCount})</p>              
              <hr />
            </div>
          </div>
          <div className="row create-row">
            <div className="col-5 offset-1">
              <a className="btn btn-primary" href="/category/create">Create a New Category</a>
            </div>
          </div>
          {this.props.categories.map( (category, index) => {
            return (
            <div className="row" key={index}>
              <div className="col-10 offset-1">
                <div className="alert alert-info">
                  {category.name}
                </div>
              </div>
            </div>
            )})
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
  return bindActionCreators({getCategories}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);