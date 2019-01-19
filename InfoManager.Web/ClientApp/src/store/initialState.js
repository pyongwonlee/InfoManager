const initialState = {
  asyncStatus: {
    asyncActionsInProgress: false
  },
  categoryList: {    
    totalCount: 0,
    categories: [],
    success: true,
    errors: []
  },
  categoryData: {    
    category: {  
      categoryId: 0,
      name: '',
      companies: []
    },
    success: true,
    errors: []
  },
  categoryActions: { 
    success: true,
    errors: []
  },
  directorList: {
    totalCount: 0,
    directors: [],
    success: true,
    errors: []
  }, 
  companyList: {    
    totalCount: 0,
    companies: [],
    success: true,
    errors: []
  }
};

export default initialState;