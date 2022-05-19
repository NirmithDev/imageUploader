
const UploadModel = require('../model/schema')
const fs= require('fs')
exports.home = async (req,res) => {
    const all_images = await UploadModel.find()
    //console.log(all_images)
    res.render('main',{images:all_images});
}

exports.uploads = (req,res,next) => {
    const files=req.files;
    console.log("->")
    console.log(files)
    if(!files){
        const error1 = new Error("PLEASE CHOOSE FILES")
        error1.httpStatusCode=400
        alert(error1)
        return Promise.reject({error:error1.message})
    }

    let imgArray=files.map((file)=>{
        let img=fs.readFileSync(file.path)
        return encode_image = img.toString("base64")
    })
    let result = imgArray.map((src,index)=>{
        let finalImg ={
            filename:files[index].originalname+Date.now(),
            contentType:files[index].mimetype,
            imageBase64: src
        }
        //console.log(finalImg)
        let newUpload = new UploadModel(finalImg);
        return newUpload
        .save()
        .then(()=>{
            return{msg:`${files[index].originalname}image uploaded successfully...!`}
        })
        .catch(error=>{
            if(error){
                if(error.name == 'MongoError' && error.code===11000){
                    return Promise.reject({error:`Duplicate ${files[index].originalname} image uploaded `})
                }
                return Promise.reject({error:error.message||`Cannot Upload ${files[index].originalname}`})
            }
        })

    })

    Promise.all(result)
    .then(msg =>{
        //res.json(msg)
        res.redirect('/')
    })
    .catch(err=>{
        res.json(err)
    })

}