import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Login again!",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id && tokenDecode.username) {
      req.user = {
        id: tokenDecode.id,
        username: tokenDecode.username,
      };
      return next();
    } else {
      return res.json({
        success: false,
        message: "Not Authorized. Login again!",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
