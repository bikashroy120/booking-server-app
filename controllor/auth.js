const User = require("../modal/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const {generateRefreshToken} = require("../config/refreshtoken");
const { generateToken } = require("../config/jwtToken");

// REGESTER USER
 const regester = async(req,res)=>{  
    try {

      

        const salt = await bcrypt.genSalt();
        const hassPassword = await bcrypt.hash(req.body.password,salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hassPassword,
        })

        const sevUser = await newUser.save();
        res.status(201).json(sevUser);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


// LOGGING IN
 const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({mes:"Invalid credentials"});

        const isMatch = await bcrypt.compare(password,user.password);
  
        if(!isMatch) return res.status(400).json({mes:"Invalid credentials"});
        const refreshToken = generateRefreshToken(user?._id);
        const updateuser = await User.findByIdAndUpdate(
          user._id,
          {
            refreshToken: refreshToken,
          },
          { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 60 * 1000,
        });

        const token = generateToken(user._id)

        

        res.status(200).json({
          _id:user.id,
          username:user.username,
          email:user.email,
          token:token
        })

    } catch (error) {
        res.status(500).json({error: error.message}) 
    }
}


// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      }
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    });
  });
  
  // logout functionality
  
  const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
      refreshToken: "",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  });


  module.exports={regester,login}