const logoutHandler = async (req, res) => {
  
  res.clearCookie('Token');
  return res.status(200).json({
    message: "logout successful",
  });
};
export default logoutHandler;
