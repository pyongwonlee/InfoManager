const authService = {
  isAuthenticated: function() {
    return true;
  },

  signIn: function(cb) {
    setTimeout(cb, 100);
  },

  signOut: function(cb) {
    setTimeout(cb, 100);
  }
};

export default authService;