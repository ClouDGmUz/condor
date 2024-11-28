import { Pool } from 'pg'
import { readFileSync } from 'fs'
import { join } from 'path'

async function migrate() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  })

  try {
    // Read migration file
    const sqlPath = join(__dirname, 'migrations', 'create_products_table.sql')
    const sql = readFileSync(sqlPath, 'utf8')

    // Execute migration
    await pool.query(sql)
    console.log('Migration completed successfully')

    // Insert some sample data
    await pool.query(`
      INSERT INTO products (id, name, description, category, volume, price, in_stock) 
      VALUES 
        ('1', 'Premium Motor Oil', 'High-quality synthetic motor oil', 'oil', '5L', 49.99, true),
        ('2', 'All-Season Antifreeze', 'Year-round engine coolant', 'antifreeze', '4L', 29.99, true),
        ('3', 'DOT 4 Brake Fluid', 'High-performance brake fluid', 'dot', '1L', 19.99, true),
        ('4', 'Distilled Water', 'Pure distilled water for cooling systems', 'water', '5L', 9.99, true)
      ON CONFLICT (id) DO NOTHING;
    `)
    console.log('Sample data inserted successfully')

  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await pool.end()
  }
}

// Check if this file is being run directly
if (require.main === module) {
  // Load environment variables
  require('dotenv').config({ path: '../../../.env' })
  
  migrate()
    .then(() => console.log('Migration process completed'))
    .catch(console.error)
}
