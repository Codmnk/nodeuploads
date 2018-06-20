const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')


// Set storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// Init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 25000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).array('myfile', 5)

function checkFileType(file, cb){
    // allow files
    const fileTypes = /jpeg|jpg|png|gif|mp4/

    // check file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

    // check mime
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true)
    }else{
        return cb('Err: Image onlY!')
    }
}

// Init app
const app = express()
//ejs
app.set('view engine', 'ejs')


app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/upload', (req, res)=>{
    upload(req, res, (err =>{
        if(err){
            // console.log(req.files)
            res.render('index', {
                msg: err
            })
        }else{ 
            if(req.files == undefined){
                res.render('index', {
                    msg: 'No File Selected!'
                })
            }else{ 
                console.log(req.files)
                res.render('index', {
                    msg: 'Image uploaded',
                    file: `uploads/${req.files.filename}`
                }
                )
            }
        }
    }))
 
})
// public folder
app.use(express.static('./public'))
const port = 3000




app.listen(port, ()=> console.log(`Server running on ${port}`))