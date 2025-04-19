import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
     try {
        const token = req.cookies.token; // Get token from cookie

    if (!token) {
        return res.status(401).json({ loggedIn: false, message: "Not logged in" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
     
    req.user = decoded.id;

    next();
    
     } catch (error) {
        return res.status(401).json({ loggedIn: false, message: "Session expired or invalid token" });
     }
};
