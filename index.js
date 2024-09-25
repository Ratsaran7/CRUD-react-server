const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "iddata", // ใช้ชื่อ database ที่คุณสร้างไว้ใน phpMyAdmin
});

app.put("/api/data/:id", (req, res) => {
  const { id } = req.params;
  const { tPrefix, tfName, tlName, ePrefix, efName, elName, dateOfBirth, religion, address } = req.body;

  db.query(
    "UPDATE personal_data SET tPrefix = ?, tfName = ?, tlName = ?, ePrefix = ?, efName = ?, elName = ?, dateOfBirth = ?, religion = ?, address = ? WHERE id = ?",
    [tPrefix, tfName, tlName, ePrefix, efName, elName, dateOfBirth, religion, address, id],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        res.status(500).send("Error updating data");
      } else {
        res.send("Data updated successfully");
      }
    }
  );
});


app.get("/api/data", (req, res) => {
  db.query("SELECT * FROM personal_data", (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(result); // Send the result as JSON
    }
  });
});

app.post("/api/data", (req, res) => {
  const { idNumber, tPrefix, tfName, tlName, ePrefix, efName, elName, dateOfBirth, religion, address } = req.body;
  db.query(
    "INSERT INTO personal_data (idNumber, tPrefix, tfName, tlName, ePrefix, efName, elName, dateOfBirth, religion, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [idNumber, tPrefix, tfName, tlName, ePrefix, efName, elName, dateOfBirth, religion, address],
    (err, result) => {
      if (err) {
        console.error("Error inserting values:", err);
        res.status(500).send("Error inserting values");
      } else {
        res.send("Values inserted successfully");
      }
    }
  );
});

app.get("/api/data/:id", (req, res) => {
  db.query("SELECT * FROM personal_data WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(result[0]); // Send the result as JSON
    }
  });
});

app.delete("/api/data/:id", (req, res) => {
  db.query("DELETE FROM personal_data WHERE id = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.send("Data deleted");
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
