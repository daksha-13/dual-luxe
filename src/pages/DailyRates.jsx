import React, { useEffect, useState } from "react";

const DailyRates = () => {
  const baseDate = new Date("2025-10-16");
  const baseRates = {
    gold: 11815,
    silver: 205,
    diamond: 1000000,
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rates, setRates] = useState(baseRates);
  const today = new Date();

  const calculateRates = (date) => {
    const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    return {
      gold: baseRates.gold + diffDays * 100,
      silver: baseRates.silver + diffDays * 2,
      diamond: baseRates.diamond + diffDays * 5000,
    };
  };

  useEffect(() => {
    setRates(calculateRates(selectedDate));
  }, [selectedDate]);

  const handleDateChange = (e) => {
    const chosenDate = new Date(e.target.value);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (chosenDate > todayDate) {
      alert("You cannot view future rates! Please select today or an earlier date.");
      setSelectedDate(todayDate);
      return;
    }
    setSelectedDate(chosenDate);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>💎 Daily Jewelry Rates 💎</h2>

        <div style={styles.dateSelector}>
          <label style={styles.label}>Select Date: </label>
          <input
            type="date"
            max={today.toISOString().split("T")[0]}
            value={selectedDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
            style={styles.input}
          />
        </div>

        <p style={styles.date}>
          Showing rates for: <strong>{selectedDate.toLocaleDateString("en-GB")}</strong>
        </p>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Metal</th>
              <th style={styles.th}>Rate (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Gold (24K)</td>
              <td style={styles.td}>{rates.gold.toLocaleString()}</td>
            </tr>
            <tr>
              <td style={styles.td}>Silver</td>
              <td style={styles.td}>{rates.silver.toLocaleString()}</td>
            </tr>
            <tr>
              <td style={styles.td}>Diamond</td>
              <td style={styles.td}>{rates.diamond.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <p style={styles.note}>*Rates are available only up to today's date.</p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "none",
    overflow: "hidden",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "600px",
    width: "90%",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#000000",
    marginBottom: "15px",
    wordWrap: "break-word",
  },
  dateSelector: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "18px",
    fontWeight: "600",
    marginRight: "10px",
    color: "#000",
  },
  input: {
    padding: "8px 12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #555",
  },
  date: {
    fontSize: "18px",
    color: "#000000",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "17px",
  },
  th: {
    borderBottom: "2px solid #000",
    padding: "12px",
    color: "#000",
  },
  td: {
    borderBottom: "1px solid #555",
    padding: "10px",
    color: "#000",
  },
  note: {
    marginTop: "10px",
    color: "#333",
    fontSize: "14px",
  },
};

export default DailyRates;
 