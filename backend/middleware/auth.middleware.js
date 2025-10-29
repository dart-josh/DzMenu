import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const userProtect = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ error: "Unauthorized - no access token provided" });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
	console.log('❌ Error in auth.middleware userProtect: ', error);
	res.status(500).json({ error: "Server error" });
  }
};

// export const ownerProtect = (req, res, next) => {
//   const {storeId} = req.body;
// 	if (storeId && req.user && req.user._id === req.) {
// 		next();
// 	} else {
// 		return res.status(403).json({ error: "Access denied - Owner only" })
// 	}
// }
