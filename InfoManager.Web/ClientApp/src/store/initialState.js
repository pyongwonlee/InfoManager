const initialState = {
  asyncStatus: {
    asyncActionsInProgress: false
  },
  categoryList: {    
    totalCount: 0,
    categories: []
  },
  categoryData: {    
    category: {  
      categoryId: 0,
      name: '',
      companies: []
    }
  },
  categoryActions: { 
    done: false
  },
  directorList: {
    totalCount: 0,
    directors: [],
  }, 
  companyList: {    
    totalCount: 0,
    companies: [],
  }
};

export default initialState;