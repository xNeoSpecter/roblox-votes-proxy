const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Proxy funcionando");
});

app.get("/votes", async (req, res) => {
    try {
        const universeId = req.query.universeId;

        if (!universeId) {
            return res.status(400).json({
                error: "Missing universeId"
            });
        }

        const response = await fetch(
            `https://games.roblox.com/v1/games/votes?universeIds=${universeId}`
        );

        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
