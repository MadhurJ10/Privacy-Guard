const app =require('./src/app')
const connectDb = require('./src/db/db')
const dotenv = require('dotenv');

dotenv.config();

connectDb()

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log('server started')
})