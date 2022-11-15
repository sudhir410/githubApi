const express = require('express');
const mongoose = require('mongoose')
const app = express()
const githubApiRouter = require("./routes/githubapi")
mongoose.connect('mongodb+srv://sudhirchoudhary410:sudhir410@startup.a101qex.mongodb.net/userform?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Database connected')
    }
})

app.use("/api/github", githubApiRouter)


app.get('*', (req, res) => {
    res.status(404).send("404 Page Not Found")

})

app.listen(process.env.PORT || 8080, () => { console.log(`server started on port : http://localhost:8080/`) })