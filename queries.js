// queries.js
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function runQueries() {
  try {
    await client.connect();
    const db = client.db('plp_bookstore');
    const collection = db.collection('books');

    // Task 2: Basic CRUD Operations

    // Find all books in a specific genre
    console.log("\n--- Books in 'Fantasy' genre ---");
    const fantasyBooks = await collection.find({ genre: "Fantasy" }).toArray();
    console.log(fantasyBooks.map(b => b.title));

    // Find books published after a certain year
    console.log("\n--- Books published after 1900 ---");
    const recentBooks = await collection.find({ published_year: { $gt: 1900 } }).toArray();
    console.log(recentBooks.map(b => ({ title: b.title, year: b.published_year })));

    // Find books by a specific author
    console.log("\n--- Books by Herman Melville ---");
    const melvilleBooks = await collection.find({ author: "Herman Melville" }).toArray();
    console.log(melvilleBooks.map(b => b.title));

    // Update the price of a specific book
    console.log("\n--- Updating price of '1984' ---");
    const updateResult = await collection.updateOne(
      { title: "1984" },
      { $set: { price: 14.99 } }
    );
    console.log(`Modified ${updateResult.modifiedCount} document`);

    // Delete a book by its title
    console.log("\n--- Deleting 'Murder on the Orient Express' ---");
    const deleteResult = await collection.deleteOne({ title: "Murder on the Orient Express" });
    console.log(`Deleted ${deleteResult.deletedCount} document`);

    // Task 3: Advanced Queries

    // Find books in stock AND published after 2010
    console.log("\n--- In-stock books published after 1920---");
    const filteredBooks = await collection
      .find({ in_stock: true, published_year: { $gt: 1920 } })
      .project({ title: 1, author: 1, price: 1, _id: 0 })
      .sort({ price: 1 })
      .limit(5)
      .toArray();
    console.log(filteredBooks);

    // Projection: only title, author, price
    console.log("\n--- All books with projection ---");
    const projectedBooks = await collection
      .find({})
      .project({ title: 1, author: 1, price: 1, _id: 0 })
      .toArray();
    console.log(projectedBooks);

    // Sorting: ascending and descending by price
    console.log("\n--- Sorted by price (ascending) ---");
    const sortedAsc = await collection
      .find({})
      .project({ title: 1, price: 1, _id: 0 })
      .sort({ price: 1 })
      .toArray();
    console.log(sortedAsc);

    console.log("\n--- Sorted by price (descending) ---");
    const sortedDesc = await collection
      .find({})
      .project({ title: 1, price: 1, _id: 0 })
      .sort({ price: -1 })
      .toArray();
    console.log(sortedDesc);

    // Pagination: limit 5, skip pages
    console.log("\n--- Page 1 (first 5 books) ---");
    const page1 = await collection
      .find({})
      .skip(0)
      .limit(5)
      .project({ title: 1, author: 1, _id: 0 })
      .toArray();
    console.log(page1);

    console.log("\n--- Page 2 (next 5 books) ---");
    const page2 = await collection
      .find({})
      .skip(5)
      .limit(5)
      .project({ title: 1, author: 1, _id: 0 })
      .toArray();
    console.log(page2);

    // Task 4: Aggregation Pipelines

    // Average price by genre
    console.log("\n--- Average Price by Genre ---");
    const avgPriceByGenre = await collection.aggregate([
      {
        $group: {
          _id: "$genre",
          averagePrice: { $avg: "$price" }
        }
      },
      {
        $sort: { averagePrice: 1 }
      }
    ]).toArray();
    console.log(avgPriceByGenre);

// Author with most books
    console.log("\n--- Author with Most Books ---");
    const topAuthor = await collection.aggregate([
      {
        $group: {
          _id: "$author",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 1
      }
    ]).toArray();
    console.log(topAuthor);

    // Group books by publication decade
    console.log("\n--- Books Count by Decade ---");
    const booksByDecade = await collection.aggregate([
      {
        $group: {
          _id: { $floor: { $divide: ["$published_year", 10] } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          decade: { $multiply: ["$_id", 10] },
          count: 1,
          _id: 0
        }
      },
      {
        $sort: { decade: 1 }
      }
    ]).toArray();
    console.log(booksByDecade);

    // Task 5: Indexing & Explain Plan

    console.log("\n--- Creating Indexes ---");
    await collection.createIndex({ title: 1 });
    console.log("Index on 'title' created");

    await collection.createIndex({ author: 1, published_year: 1 });
    console.log("Compound index on 'author' and 'published_year' created");

    // Explain query performance
    console.log("\n--- EXPLAIN: Query by title ---");
    const explainTitle = await collection
      .find({ title: "The Great Gatsby" })
      .explain("executionStats");
    console.log("Winning plan:", explainTitle.queryPlanner.winningPlan.inputStage ? "IXSCAN (Index Used)" : "COLLSCAN");

    console.log("\n--- EXPLAIN: Query by author and year ---");
    const explainAuthorYear = await collection
      .find({ author: "J.K. Rowling", published_year: 1997 })
      .explain("executionStats");
    console.log("Winning plan:", explainAuthorYear.queryPlanner.winningPlan.inputStage ? "IXSCAN" : "COLLSCAN");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

runQueries();
