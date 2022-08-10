import  express  from "express";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('pages/home');
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})