const seedBlogpost = require('./seed_blogpost')
const seedComment = require('./seed_comment')
const db = require('../config/connection')
const seedAll = async () => {
    await db.sync({ force: true });
    await seedBlogpost();
    await seedComment()
    // for additional seeds, add functions here
    console.log('Database seeded')
    process.exit(0)
}
seedAll();