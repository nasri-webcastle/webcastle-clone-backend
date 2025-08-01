const { createConnection } = require('mysql2/promise');
const dotenv = require('dotenv');
 
dotenv.config();
 
async function fixHomesIndex() {
  let connection;
 
  try {
    connection = await createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      charset: 'utf8mb4'
    });
 
    console.log('Connected to database successfully.');
 
    // First, let's verify the table structure
    console.log('Checking table structure...');

    const [columns] = await connection.query('SHOW CREATE TABLE enquiries;');
    console.log('Current table structure:', columns);
 
    // Drop existing indexes if they exist
    try {
      await connection.query('DROP INDEX enquiries_documents_idx ON enquiries;');
      console.log('Dropped existing composite index.');
    } catch (error) {
      console.log('No existing composite index to drop.');
    }
 
    // Modify columns with minimal lengths
    await connection.query(`
      ALTER TABLE enquiries
      MODIFY document_id VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
      MODIFY locale VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);
    console.log('Column lengths modified successfully.');
 
    // Create separate indexes first
    await connection.query(`
      ALTER TABLE enquiries
      ADD INDEX idx_document_id(document_id(64)),
      ADD INDEX idx_locale(locale(20)),
      ADD INDEX idx_published_at(published_at);
    `);
    console.log('Individual indexes added successfully.');
 
    // Add the composite index with limited lengths
    await connection.query(`
      ALTER TABLE enquiries
      ADD INDEX enquiries_documents_idx(document_id(50), locale(20), published_at);
    `);
    console.log('Composite index added successfully.');
 
    console.log('All operations completed successfully!');
  } catch (error) {
    console.error('Error occurred:', error);
    console.error('SQL Error:', error.sqlMessage);
    console.error('Error Code:', error.code);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}
 
// Execute the function
fixHomesIndex()
  .then(() => {
    console.log('Script completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
 


 
 
// const { createConnection } = require('mysql2/promise');
// const dotenv = require('dotenv');
 
// dotenv.config();
 
// async function fixPackagesCmpsIndex() {
//   let connection;
 
//   try {
//     connection = await createConnection({
//       host: process.env.DATABASE_HOST,
//       user: process.env.DATABASE_USERNAME,
//       password: process.env.DATABASE_PASSWORD,
//       database: process.env.DATABASE_NAME,
//       charset: 'utf8mb4'
//     });
 
//     console.log('Connected to database successfully.');
 
//     // The correct table name is wishlists_cmps, not my_wishlists
//     const tableName = 'enquiries_cmps';
 
//     // First, let's check the table structure to confirm column names
//     const [columns] = await connection.query(`DESCRIBE ${tableName};`);
//     console.log('Table columns:', columns.map(col => col.Field));
 
//     // Drop existing unique index if it exists
//     try {
//       const [indexes] = await connection.query(`SHOW INDEX FROM ${tableName};`);
//       const indexNames = new Set(indexes.map(idx => idx.Key_name));
//       console.log('Existing indexes:', [...indexNames]);
     
//       if (indexNames.has('enquiries_cmps')) {
//         await connection.query(`ALTER TABLE ${tableName} DROP INDEX destinations_uq;`);
//         console.log('Dropped existing unique index "my_wishlists".');
//       } else {
//         console.log('No index named "my_wishlists" found.');
//       }
//     } catch (error) {
//       console.log('Error checking or dropping indexes:', error.message);
//     }
 
//     // Modify columns to reduce length if needed
//     try {
//       await connection.query(`
//         ALTER TABLE ${tableName}
//         MODIFY entity_id VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
//         MODIFY cmp_id VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
//         MODIFY field VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
//         MODIFY component_type VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
//       `);
//       console.log('Column lengths modified successfully.');
//     } catch (error) {
//       console.log('Error modifying columns (they may have different names):', error.message);
//       // Get actual column structure to help diagnose
//       const [columns] = await connection.query(`DESCRIBE ${tableName};`);
//       console.log('Actual column structure:', columns);
//     }
 
//     // Create new index with shorter prefix lengths
//     await connection.query(`
//       ALTER TABLE ${tableName}
//       ADD UNIQUE INDEX contact_uses_uq(entity_id(20), cmp_id(20), field(30), component_type(20));
//     `);
//     console.log('New unique index added successfully.');
 
//     console.log('All operations completed successfully!');
//   } catch (error) {
//     console.error('Error occurred:', error);
//     console.error('SQL Error:', error.sqlMessage);
//     console.error('Error Code:', error.code);
//     throw error;
//   } finally {
//     if (connection) {
//       await connection.end();
//       console.log('Database connection closed.');
//     }
//   }
// }
 
// // Execute the function
// fixPackagesCmpsIndex()
//   .then(() => {
//     console.log('Script completed successfully.');
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.error('Script failed:', error);
//     process.exit(1);
//   });
 
 