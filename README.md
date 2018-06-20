# NodeUploads

An example of how to upload multiple images or video locally with Node.js and Multer.
If the app is render on the mobile device browser, photo or video can be capture using device's camer to upload the photot or video.
### Version
1.0.0

## Usage

### Installation

Install the dependencies

```sh
$ npm install
```

### Serve
To serve in the browser

```sh
$ npm start
```

## App Info
change number of images allowed to upload by changing number in app.js line 22
```
const upload = multer({
    storage: storage,
    limits: {fileSize: 25000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).array('myfile', 5) // 5 indicates that the number of file allowed to upload at once.
```

### Author

Prem Acharya
extended from auther [Traversy Media](http://www.traversymedia.com) sample

### Version

1.0.0

### License

This project is licensed under the MIT License
