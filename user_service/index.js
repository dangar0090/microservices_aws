import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
import Query from './models/query.js';

// Initializing the app
const app = express();
dotenv.config();

// Cross-origin resource sharing
app.use(cors());

// For images and posting data
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Simple get request
app.get('/userService', (req, res) => {
    res.send("userService");
});

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        // Optional: Check database connection
        const dbStatus = await mongoose.connection.db.admin().ping();
        if (dbStatus.ok) {
            res.status(200).json({ status: 'Healthy' });
        } else {
            res.status(500).json({ status: 'Unhealthy' });
        }
    } catch (error) {
        res.status(500).json({ status: 'Unhealthy', error: error.message });
    }
});

// Create a query
app.post('/userService/:uid/query', async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(402).json({ message: "No user exists with given id" });
        }
        const newQuery = new Query({
            username: user.username,
            body: req.body.body,
            userID: userId,
            prescriptions: []
        });
        const query = await newQuery.save();
        user.queries.push(query._id);
        await User.findByIdAndUpdate(userId, { queries: user.queries }, { new: true });
        return res.status(200).json({ message: "Query created successfully", query: query });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get all the queries
app.get('/userService/queries', async (req, res) => {
    try {
        const queries = await Query.find();
        return res.status(200).json(queries);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`User service running on PORT ${PORT}`)))
    .catch((error) => console.log(error));
