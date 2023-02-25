const download = require('image-downloader');

const uploadLinkImg = async(req,res)=>{
    const {link} = req.body;

    try {
    const pathName = Data.now()+ ".jpg"
    download.image({
        url: link,
        dest: __dirname + "../uploads/" + pathName, 
    })

        res.status(200).json({pathName})

    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {uploadLinkImg}