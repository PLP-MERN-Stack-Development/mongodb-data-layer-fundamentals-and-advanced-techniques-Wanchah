# MongoDB Fundamentals - Week 1

## Setup Instructions

Before you begin this assignment, please make sure you have the following installed:

1. **MongoDB Community Edition** - [Installation Guide](https://www.mongodb.com/docs/manual/administration/install-community/)
2. **MongoDB Shell (mongosh)** - This is included with MongoDB Community Edition
3. **Node.js** - [Download here](https://nodejs.org/)

### Node.js Package Setup

Once you have Node.js installed, run the following commands in your assignment directory:

```bash
# Initialize a package.json file
npm init -y

# Install the MongoDB Node.js driver
npm install mongodb
```

## Assignment Overview

This week focuses on MongoDB fundamentals including:

- Creating and connecting to MongoDB databases
- CRUD operations (Create, Read, Update, Delete)
- MongoDB queries and filters
- Aggregation pipelines
- Indexing for performance

## Submission

Complete all the exercises in this assignment and push your code to GitHub using the provided GitHub Classroom link.

### Steps to Submit

1. Accept the GitHub Classroom assignment invitation.
2. Clone your personal repository created by GitHub Classroom.
3. Add the following files to your repository:
   - `insert_books.js` (with your modifications if any)
   - `queries.js` (containing all your MongoDB queries)
   - `README.md` (this file, updated with your instructions)
   - A screenshot of your MongoDB Compass or Atlas showing your collections and sample data.
4. Commit and push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Week 1 MongoDB Fundamentals Submission"
   git push origin main
   ```
5. Verify your submission on GitHub.

## Additional Notes

- Ensure your MongoDB Compass or Atlas screenshot clearly shows the `plp_bookstore` database and the `books` collection with sample data.
- Follow the autograding criteria provided in the assignment.

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data
- `queries.js`: Script containing various MongoDB queries to interact with the `books` collection
- `README.md`: This file, updated with your instructions
- `screenshot.png`: MongoDB Compass or Atlas screenshot showing the `plp_bookstore` database and the `books` collection with sample data.

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)

## How to Run and Execute the Files

### Prerequisites

Ensure the following are installed and properly configured on your system:

1. **MongoDB** (local installation or Atlas account)
2. **Node.js** (v18 or higher)
3. **MongoDB Shell (mongosh)** or **MongoDB Compass**

### Steps to Run the Files

#### 1. `insert_books.js`

This script populates the `plp_bookstore` database with sample book data.

1. Open a terminal and navigate to the directory containing `insert_books.js`:
   ```bash
   cd path to your directory that has been cloned from GitHub
   ```
2. Run the script using Node.js:
   ```bash
   node insert_books.js
   ```
3. Verify the data insertion:
   - Open MongoDB Compass or connect to your MongoDB instance using `mongosh`.
   - Check the `plp_bookstore` database and the `books` collection to ensure the data is inserted.

#### 2. `queries.js`

This script contains various MongoDB queries to interact with the `books` collection.

1. Ensure the `insert_books.js` script has been executed and the `books` collection is populated.
2. Run the script using Node.js:
   ```bash
   node queries.js
   ```
3. Review the output in the terminal to see the results of the queries.

### Additional Notes

- If you are using MongoDB Atlas, update the `uri` variable in both `insert_books.js` and `queries.js` with your Atlas connection string.
- For any issues, refer to the MongoDB logs or the terminal output for debugging.
