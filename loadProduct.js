const fs = require('fs');
const csv = require('csv-parser');
const db = require('./db');

const results = [];

fs.createReadStream('./data/products.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.forEach((product) => {
      const { name, price, description, department } = product;
      db.run(
        'INSERT INTO products (name, price, description, department) VALUES (?, ?, ?, ?)',
        [name, price, description, department],
        (err) => {
          if (err) console.error('Error inserting:', err.message);
        }
      );
    });

    console.log('✅ CSV data loaded into database.');
  });
