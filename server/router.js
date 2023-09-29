const express = require('express')
const mysql = require("mysql2");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router()

//* connect to mysql
const pool = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'MySQL',
    database: "test"
})
pool.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

//* setup download destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname); // Unique filename for each uploaded image
    },
});

//* resolve requset
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(req.method, req.url)
    next()
})

//* signup
router.post('/signup', (req, res) => {
    console.log(req.body)
    const sql = "INSERT INTO login (`firstname`,`lastname`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.password
    ]
    pool.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("error");
        }
        return res.json("register success!")
    })
})

//* login
router.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email`=(?) AND `password`=(?)";
    console.log(req.body)
    pool.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        }
        else {
            return res.json("Faile");
        }
    })
})

//* upload image to SQL

const upload = multer({ storage: storage });

router.post('/upload', upload.array('images', 10), (req, res) => {
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
    }

    // Assuming you want to insert all uploaded files
    const insertPromises = files.map((file) => {
        const filename = file.filename;
        const imgpath = path.join(__dirname, 'uploads', filename);

        return new Promise((resolve, reject) => {
            fs.readFile(imgpath, (err, imageBuffer) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }

                const query = 'INSERT INTO photo (file_name, image_data) VALUES (?, ?)';
                pool.query(query, [filename, imageBuffer], (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve({ id: results.insertId, filename });
                });
            });
        });
    });

    Promise.all(insertPromises)
        .then((insertedFiles) => {
            res.json({ message: 'Images uploaded successfully!', files: insertedFiles });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Error inserting image data into the database.' });
        });
});

// Download image from SQL
router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const path2file = path.join(__dirname, 'uploads', filename);

    res.download(path2file, filename, (err) => {
        if (err) {
            console.log(err);
            res.status(404).json({ message: 'File not found.' });
        } else {
            console.log('File sent successfully');
        }
    });
});

router.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    const path2file = path.join(__dirname, 'uploads', filename);
  
    // 使用 fs.unlink 删除文件
    fs.unlink(path2file, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error deleting file.' });
      }
      console.log('File deleted successfully');
      res.json({ message: 'File deleted successfully' });
    });
  });

module.exports = { router }
