const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Fetch all education units
router.get("/", (req, res) => {
  const sql = `
  SELECT 
   e.id,
   e.name,
   e.address,
   r.name AS region,
   s.name AS subdistrict,
   e.group,
   e.instance,
   e.leader,
   e.activity,
   e.gender_man,
   e.gender_women,
   e.age_under6years,
   e.age_6to10years,
   e.age_11to18years,
   e.age_over44years,
   e.photo,
   e.video,
  DATE_FORMAT(e.time, '%d-%m-%Y') as date,
  IF(e.SK IS NULL OR LENGTH(e.SK) = 0, '', e.SK) AS suratK
FROM education_units e
LEFT JOIN subdistricts s ON e.subdistrict_id = s.id
LEFT JOIN regions r ON s.region_id = r.id
ORDER BY e.id ASC
`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ CREATE Education Unit
router.post("/", (req, res) => {
  const data = req.body;

  const query = `INSERT INTO education_units SET ?`;

  db.query(query, data, (err, result) => {
    if (err) {
      console.error("Error inserting education unit:", err);
      res.status(500).send("Error creating data");
    } else {
      res
        .status(201)
        .json({ message: "Education unit created", id: result.insertId });
    }
  });
});

// ✅ GET Education Unit by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM education_units WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(results[0]);
  });
});

// ✅ UPDATE Education Unit
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const query = `UPDATE education_units SET ? WHERE id = ?`;

  db.query(query, [data, id], (err, result) => {
    if (err) {
      console.error("Error updating education unit:", err);
      res.status(500).send("Error updating data");
    } else {
      res.json({ message: "Education unit updated" });
    }
  });
});

// ✅ DELETE Education Unit
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM education_units WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting education unit:", err);
      res.status(500).send("Error deleting data");
    } else {
      res.json({ message: "Education unit deleted" });
    }
  });
});

// Fetch subdistricts for a specific region
router.get("/region/:region", (req, res) => {
  // Pastikan ini menggunakan :region bukan query
  const region = req.params.region; // Mengambil parameter wilayah
  const sql = `
    SELECT 
      s.name AS subdistrict,
      COUNT(e.id) AS value
    FROM subdistricts s
    JOIN regions r ON s.region_id = r.id
    LEFT JOIN education_units e ON e.subdistrict_id = s.id
    WHERE r.name = ?
    GROUP BY s.name
  `;

  db.query(sql, [region], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // Mengirim data sebagai JSON
  });
});

// ✅ GET all regions
router.get("/region", (req, res) => {
  const sql = "SELECT id, name FROM regions";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ GET subdistricts by region_id
router.get("/subdistricts/:region_id", (req, res) => {
  const regionId = req.params.region_id;
  const sql = "SELECT id, name FROM subdistricts WHERE region_id = ?";

  db.query(sql, [regionId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;
