const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("DigiKisan Backend Running...");
});

app.post("/app", async (req, res) => {
    try {
        const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall } = req.body;

        // Validate inputs
        if (![nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall].every(value => value !== undefined && value !== "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const apiUrl = "http://127.0.0.1:5000/predict";
        console.log(`Sending request to ${apiUrl} with data:`, req.body);

        const response = await axios.post(apiUrl, req.body, { headers: { "Content-Type": "application/json" } });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching crop recommendation:", error?.response?.data || error.message);
        res.status(error?.response?.status || 500).json({ message: "Error getting crop recommendation. Please try again." });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
