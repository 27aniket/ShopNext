import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User";
import sendEmail from "../utils/sendEmail";

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expireIn: "7d" });
};

// Register Users

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedpassword });

    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const message = `
Welcome to ShopNext, ${name}! 🎉

We're excited to have you join our community.

Your account has been successfully created, and you can now explore a wide range of products, enjoy seamless shopping, track your orders, and take advantage of exclusive offers.

What you can do next:
✅ Browse our latest products
✅ Add items to your wishlist
✅ Place your first order

Thank you for choosing ShopNext. We look forward to providing you with an amazing shopping experience!

Your OTP for ShopNext registration is ${otp}.

Happy Shopping! 🛍️

Best Regards,
The ShopNext Team
`;

     await sendEmail(email, "Welcome to ShopNext - Your otp for registration", message)

     return res.status(201).json({
       _id: user.id,
       name: user.name,
       email: user.email,
       role: user.role,
       token: genrateToken(user._id),
     });
    } else {
      return res.json(500).status({ message: "Invalid user data" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Logging Users

export const loginUser = async (req, res) => {
        const {email, password} = req.body
        try{ 
                const user = await User.find({email});
                if(user && (await bcrypt.compare(password, user.password))) {
                        res.json({
                                _id: user.id,
       name: user.name,
       email: user.email,
       role: user.role,
       token: genrateToken(user._id)
                        });
                }
                else{
                    return res.status(400).json({message: "Invalid email and password"})
                }

        }catch(error){
                return res.status(500).json({message: "Server Error"})
        }
}

// getUers

export const getUers = async (req, res) => {
        try{
        const users = await User.find({}).select('-password');
        res.json(users);
        
} catch(error){
        return res.status(500).json({message: "Server error"})
}
}


