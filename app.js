const express = require('express');
const axios = require('axios');

const app = express();
// WAJIB pakai process.env.PORT agar Render bisa membaca port-nya
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API BotKu Berhasil Online 24 Jam!');
});

app.get('/api/sholat', async (req, res) => {
    try {
        const kota = req.query.kota;
        if (!kota) return res.status(400).json({ status: false, pesan: "?kota= wajib diisi!" });

        const url = `https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Indonesia&method=11`;
        const response = await axios.get(url);
        const jadwal = response.data.data.timings;

        res.status(200).json({
            status: true,
            creator: "habibi store",
            data: { kota: kota.toUpperCase(), jadwal: jadwal }
        });
    } catch (error) {
        res.status(500).json({ status: false, pesan: "Error / Kota tidak ditemukan" });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
