const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Change this in production

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        createTables();
    }
});

// Create tables
function createTables() {
    db.run(`CREATE TABLE IF NOT EXISTS parents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS children (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    name TEXT NOT NULL,
    age INTEGER,
    FOREIGN KEY (parent_id) REFERENCES parents (id)
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT UNIQUE NOT NULL,
    note TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
}

// Routes

// Register parent
app.post('/api/register', async (req, res) => {
    const { email, phone, password } = req.body;

    if (!email || !phone || !password) {
        return res.status(400).json({ error: 'Email, phone, and password are required' });
    }

    try {
        // Check if email already exists
        db.get('SELECT id FROM parents WHERE email = ?', [email], async (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (row) {
                return res.status(409).json({ error: 'Email already registered' });
            }

            // Hash password
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            // Insert new parent
            db.run('INSERT INTO parents (email, phone, password_hash) VALUES (?, ?, ?)',
                [email, phone, passwordHash],
                function (err) {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to create account' });
                    }

                    // Generate JWT token
                    const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET, { expiresIn: '7d' });

                    res.status(201).json({
                        message: 'Account created successfully',
                        token,
                        parentId: this.lastID
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login parent
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM parents WHERE email = ?', [email], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!row) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, row.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: row.id, email: row.email }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Login successful',
            token,
            parentId: row.id
        });
    });
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Get parent profile
app.get('/api/profile', authenticateToken, (req, res) => {
    db.get('SELECT id, email, phone, created_at FROM parents WHERE id = ?', [req.user.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Parent not found' });
        }

        res.json(row);
    });
});

// Add child
app.post('/api/children', authenticateToken, (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required' });
    }

    db.run('INSERT INTO children (parent_id, name, age) VALUES (?, ?, ?)',
        [req.user.id, name, age],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to add child' });
            }

            res.status(201).json({
                message: 'Child added successfully',
                childId: this.lastID
            });
        }
    );
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
    db.all('SELECT * FROM bookings', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Create/Update booking
app.post('/api/bookings', (req, res) => {
    const { date, note } = req.body;
    if (!date) return res.status(400).json({ error: 'Date is required' });

    if (!note) {
        // Delete if note is empty
        db.run('DELETE FROM bookings WHERE date = ?', [date], function(err) {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json({ message: 'Booking removed' });
        });
    } else {
        // Insert or Replace
        db.run('INSERT OR REPLACE INTO bookings (date, note) VALUES (?, ?)', [date, note], function(err) {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json({ message: 'Booking saved', id: this.lastID });
        });
    }
});

// Get children
app.get('/api/children', authenticateToken, (req, res) => {
    db.all('SELECT * FROM children WHERE parent_id = ?', [req.user.id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(rows);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});