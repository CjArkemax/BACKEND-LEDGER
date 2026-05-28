require("dotenv").config()

const app = require("./src/app")
const connectToDB = require("./src/config/db")

connectToDB();

PORT = 3000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})