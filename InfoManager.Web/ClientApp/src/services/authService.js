const authService = {
  isAuthenticated () {
    return true;
  },

  signIn(cb) {
    setTimeout(cb, 100);
  },

  signOut(cb) {
    setTimeout(cb, 100);
  }
};

export default authService;