const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var app = express();
const port = 1989;

var url = bodyParser.urlencoded({ extended: false });
app.use(url);
app.use(bodyParser.json());
app.use(cors());


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Masterof04',
    database: 'onetech',
    port: 3306
})

app.get('/login', (req, res) => {
    const {email, password} = req.query;
    var data = {
        email: email,
        password: password
    };

    var sql = `select * from userlist where email = '${email}' and password = '${password}'`;
    
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(results);
        console.log(data)
    })
})

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    var data = {
        username: username,
        email: email,
        password: password
    };
    var sql = 'INSERT INTO userlist SET ?'

    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(data);
    })
});

app.get('/allProducts', (req, res) => {
    // var sql = `select * from products where Brand like 'Apple';`;
    var sql = 'select * from products;';
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/allSmartphone', (req, res) => {
    var sql = `select * from products where CategoryID like '1';`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/allLaptop', (req, res) => {
    var sql = `select * from products where CategoryID like '2';`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/allGaming', (req, res) => {
    var sql = `select * from products where CategoryID like '3';`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/products/:id', (req, res) => {
    var data = req.params.id
    var sql = `select * from products join categories on CategoryID = idCategories where idProduct = '${data}';`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/filterbrand' , (req,res) => {
    const { namabrand } = req.query;
    var sql = `select * from products where Brand like '${namabrand}';`;
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})


// ============================================== Sort Product List ==============================================
app.get('/sortallnameasc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Products") {
        var sql = `select * from products order by ProductName;`;
    }
    else {
        var sql = `select * from products where Brand like '${namabrand}' order by ProductName;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortallnamedesc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Products") {
        var sql = `select * from products order by ProductName DESC;`;
    }
    else {
        var sql = `select * from products where Brand like '${namabrand}' order by ProductName DESC;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortallpriceasc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Products") {
        var sql = `select * from products order by SalePrice + 0;`;
    }
    else {
        var sql = `select * from products where Brand like '${namabrand}' order by SalePrice + 0;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortallpricedesc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Products") {
        var sql = `select * from products order by SalePrice + 0 DESC;`;
    }
    else {
        var sql = `select * from products where Brand like '${namabrand}' order by SalePrice + 0 DESC;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})


// ============================================= Sort Smartphone List ===========================================================================
app.get('/sortsmartphonenameasc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Smartphones") {
        var sql = `select * from products where CategoryID like '1' order by ProductName;`;
    }
    else {
        var sql = `select * from products where CategoryID like '1' and Brand like '${namabrand}' order by ProductName;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortsmartphonenamedesc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Smartphones") {
        var sql = `select * from products where CategoryID like '1' order by ProductName DESC;`;
    }
    else {
        var sql = `select * from products where CategoryID like '1' and Brand like '${namabrand}' order by ProductName DESC;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortsmartphonepriceasc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Smartphones") {
        var sql = `select * from products where CategoryID like '1' order by SalePrice + 0;`;
    }
    else {
        var sql = `select * from products where CategoryID like '1' and Brand like '${namabrand}' order by SalePrice + 0;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortsmartphonepricedesc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Smartphones") {
        var sql = `select * from products where CategoryID like '1' order by SalePrice + 0 DESC;`;
    }
    else {
        var sql = `select * from products where CategoryID like '1' and Brand like '${namabrand}' order by SalePrice + 0 DESC;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})


// =============================================== Sort Laptop List ===========================================================================
app.get('/sortlaptopnameasc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Laptops") {
        var sql = `select * from products where CategoryID like '2' order by ProductName;`;
    }
    else {
        var sql = `select * from products where CategoryID like '2' and Brand like '${namabrand}' order by ProductName;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortlaptopnamedesc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Laptops") {
        var sql = `select * from products where CategoryID like '2' order by ProductName DESC;`;
    }
    else {
        var sql = `select * from products where CategoryID like '2' and Brand like '${namabrand}' order by ProductName DESC;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortlaptoppriceasc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Laptops") {
        var sql = `select * from products where CategoryID like '2' order by SalePrice + 0;`;
    }
    else {
        var sql = `select * from products where CategoryID like '2' and Brand like '${namabrand}' order by SalePrice + 0;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortlaptoppricedesc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Laptops") {
        var sql = `select * from products where CategoryID like '2' order by SalePrice + 0 DESC;`;
    }
    else {
        var sql = `select * from products where CategoryID like '2' and Brand like '${namabrand}' order by SalePrice + 0 DESC;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})


// =============================================== Sort Game Console List ===========================================================================
app.get('/sortgamingnameasc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Game Consoles") {
        var sql = `select * from products where CategoryID like '3' order by ProductName;`;
    }
    else {
        var sql = `select * from products where CategoryID like '3' and Brand like '${namabrand}' order by ProductName;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortgamingnamedesc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Game Consoles") {
        var sql = `select * from products where CategoryID like '3' order by ProductName DESC;`;
    }
    else {
        var sql = `select * from products where CategoryID like '3' and Brand like '${namabrand}' order by ProductName DESC;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortgamingpriceasc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Game Consoles") {
        var sql = `select * from products where CategoryID like '3' order by SalePrice + 0;`;
    }
    else {
        var sql = `select * from products where CategoryID like '3' and Brand like '${namabrand}' order by SalePrice + 0;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})

app.get('/sortgamingpricedesc' , (req,res) => {
    const { namabrand } = req.query;
    if(namabrand == "All Game Consoles") {
        var sql = `select * from products where CategoryID like '3' order by SalePrice + 0 DESC;`;
    }
    else {
        var sql = `select * from products where CategoryID like '3' and Brand like '${namabrand}' order by SalePrice + 0 DESC;`;
    }
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})


// ========================== Search Product ==========================================================================
app.get('/search', (req,res) => {
    var sql = `select * from products where ProductName like '%${req.query.ProductName}%';`;
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

