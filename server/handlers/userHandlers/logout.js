const logoutHandler = async (req, res) => {
  res.clearCookie('Token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
  
  return res.status(200).json({
    message: "logout successful",
  });
};

export default logoutHandler;