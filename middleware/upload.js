const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Secure file upload handler
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Store outside of the web root
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        // Use a UUID for filename instead of user-provided name
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB limit
    },
    fileFilter: (req, file, cb) => {
        // Only allow specific MIME types
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
        }
    }
});

module.exports = upload;
