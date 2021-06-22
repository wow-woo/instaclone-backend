export default {
  Comment: {
    isMine: ({ userId }, { loggedInUser: id }) => {
      return userId === id;
    },
  },
};
