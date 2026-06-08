
const admin = (req, res, next) => {
  if(req.user && req.user.role === "admin") {
        next()
  }else{
        return res.status(403).json({message: "Access denied, Only Admin"})
  }
}

export default admin;