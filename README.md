# 📌 Attendance Tracker 🚀

## 📖 About This Project
This **Google Apps Script-powered** Attendance Tracker automatically creates an attendance sheet from your **timetable**, allows easy attendance marking, and generates **reports & visualizations** 📊! Perfect for students, teachers, or anyone who wants **zero manual effort** in tracking attendance. 😎

## 🎯 Features
✅ **Auto-generates an Attendance Sheet** from the timetable.  
✅ **Smart attendance marking** (TRUE/FALSE).  
✅ **Skips Lunch Break 🥪** to keep it real.  
✅ **Live attendance percentage calculation** 📊.  
✅ **Easy-to-read results sheet** (dates, total classes, present, absent, attendance %).  
✅ **Can be scheduled to run automatically**.  

## 📂 Project Structure
```
📁 Attendance Tracker
 ├── 📄 timetable.gs          # Reads timetable and creates attendance sheet
 ├── 📄 attendance.gs         # Handles attendance marking & processing
 ├── 📄 results.gs            # Calculates attendance percentages
 ├── 📄 main.gs               # Main script to run all functions
 ├── 📜 README.md             # This awesome guide
```

## 🛠️ How It Works
1️⃣ **Set up your Timetable** in Google Sheets (Days in Column A, Times in Row 1).  
2️⃣ **Run `generateAttendanceSheet()`** to auto-create an attendance sheet.  
3️⃣ **Mark attendance manually (TRUE/FALSE)**.  
4️⃣ **Run `updateAttendanceReport()`** to generate the results.  
5️⃣ (Optional) **Set triggers** to automate daily updates. 🔄  

## 📝 Timetable Format
|     | 9:00 AM | 10:00 AM | 11:00 AM | 12:00 PM | (Lunch) | 1:30 PM | 2:30 PM |  
|----|---------|---------|---------|---------|---------|---------|---------|  
| Monday | Math  | Physics | Chem   | English | 🍕 | History | CS  |  
| Tuesday | Bio  | Geo | Civics  | Music | 🍕 | Art | Sports |  

## ⚡ Installation Guide
1️⃣ Open **Google Sheets** and go to **Extensions > Apps Script**.  
2️⃣ Copy-paste the `.gs` files into the script editor.  
3️⃣ Save & Run `generateAttendanceSheet()`.  
4️⃣ Done! 🎉 Mark attendance & track results automatically!

## 🚀 Automate Attendance Updates
- Go to **Apps Script > Triggers**.  
- Set `updateAttendanceReport()` to run **daily** at a fixed time.  
- Boom 💥! Your attendance updates itself!

## 🎨 Visualizing Attendance (Optional)
- Use Google Sheets **Charts** to create cool visualizations 📊.  
- Export results to **Power BI/Tableau** for advanced analytics.  

## 🛠️ Contributing
Got cool ideas? Fork it, tweak it, and submit a PR! 🚀

## 📜 License
MIT - Because sharing is caring! 💖

---
Built using **Google Apps Script** and **Google Sheets**.
