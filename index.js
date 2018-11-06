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


// ================================================ Login & Register =======================================================================
app.get('/login', (req, res) => {
    const {username, password} = req.query;
    var data = {
        username: username,
        password: password
    };
    var sql = `select * from userlist where username = '${username}' and password = '${password}'`;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(results);
        console.log(data)
    })
})

app.get('/keeplogin', (req, res) => {
    const { username } = req.query;
    var data = {
        username: username,
    };
    var sql = `select * from userlist where username = '${username}';`;
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
    var sql = `select * from userlist where username = '${username}';`;
    conn.query(sql, data, (err,results) => {
        if (err) throw err;
        console.log(results);
        if(results.length > 0) {
            res.send("Username already exists")
        }
        else {
            var sql2 = 'INSERT INTO userlist SET ?'
            conn.query(sql2, data, (err2, results2) => {
                if(err2) throw err2;
                console.log(results2);
                res.send(data);
            })
        }
    })
});


// ================================================ Product List =======================================================================
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
        console.log(results)
    })
})

app.get('/filternewproducts' , (req,res) => {
    var sql = `select * from products where NormalPrice = 0;`;
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send( results )
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


// ================================== Search Product ==========================================================================
app.get('/search', (req,res) => {
    var sql = `select * from products where ProductName like '%${req.query.ProductName}%';`;
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send(results)
    })
})


// ======================================= Admin ===============================================================
app.get('/admin', (req,res) => {
    var sql = `select *, (quantity * SalePrice) as TotalPrice from cart;`;
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/searchAdmin', (req,res) => {
    const { ProductName } = req.query;
    // var sql = `select *, (quantity * SalePrice) as TotalPrice from cart where username like '%${username}%' and ProductName like '%${ProductName}%';`;
    var sql = `select * from products where ProductName like '%${ProductName}%';`;
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/adminSortIdProduct', (req,res) => {
    var sql = 'select * from products order by idProduct;';
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/adminSortIdProductDesc', (req,res) => {
    var sql = 'select * from products order by idProduct desc;';
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/adminSortProductName', (req,res) => {
    var sql = 'select * from products order by ProductName;';
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/adminSortProductNameDesc', (req,res) => {
    var sql = 'select * from products order by ProductName desc;';
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/adminSortNormalPrice', (req,res) => {
    var sql = 'select * from products order by NormalPrice;';
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/adminSortNormalPriceDesc', (req,res) => {
    var sql = 'select * from products order by NormalPrice desc;';
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/adminSortPromoPrice', (req,res) => {
    var sql = 'select * from products order by SalePrice + 0;';
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/adminSortPromoPriceDesc', (req,res) => {
    var sql = 'select * from products order by SalePrice + 0 desc;';
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

// Contoh untuk admin page Total Price
// app.get('/adminSortTotalPriceDesc', (req,res) => {
//     var sql = 'select *, (quantity * SalePrice) as TotalPrice from cart order by TotalPrice desc;';
//     conn.query(sql, (err,results) => {
//         if (err) throw err;
//         res.send(results)
//     })
// })


// =========================================== Admin Add/Edit/Delete Product ==================================================================================
app.post('/adminAddProduct', (req,res) => {
    const { Image1, Image2, Image3, Brand, ProductName, Description, Features1, Features2, Features3, Features4, NormalPrice, SalePrice } = req.body;
    var data = { Image1, Image2, Image3, Brand, ProductName, Description, Features1, Features2, Features3, Features4, NormalPrice, SalePrice }
    var sql = 'INSERT INTO products SET ?';
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        var sql1 = `select * from products`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.delete('/adminDeleteProduct/:id', (req,res) => {
    var sql = `delete from products where idProduct = '${req.params.id}';`;
    conn.query(sql, (err, results) => {
        if(err) throw err;
        var sql1 = `select * from products;`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            res.send(results1);
        })
    })
});

app.put('/adminEditProduct/:id', (req,res) => {
    const { Image1, Image2, Image3, Brand, ProductName, Description, Features1, Features2, Features3, Features4, NormalPrice, SalePrice } = req.body;
    var data = { Image1, Image2, Image3, Brand, ProductName, Description, Features1, Features2, Features3, Features4, NormalPrice, SalePrice }
    var sql = `update products set ? where idProduct = '${req.params.id}';`;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        var sql1 = `select * from products;`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            res.send(results1);
        })
    })
})


// =========================================== Admin Transaction =====================================================================
app.get('/admintransaction', (req,res) => {
    var sql = `select * from transaction;`
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/searchTransDetail', (req,res) => {
    const { username } = req.query;
    var sql = `select * from transaction where username = '${username}';`;
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results)
    })
})

app.get('/admintransdetail/:id', (req,res) => {
    const { id } = req.params
    var sql = `select * from transdetail where idTransaction = '${id}';`;
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results);
    })
})


// ================================================ Cart =============================================================================
app.get('/cart/:username', (req,res) => {
    var sql = `select * from cart where username = '${req.params.username}';`;
    console.log(req.params.username)
    conn.query(sql, (err,results) => {
        
        if (err) throw err;
        res.send(results);
    })
});

app.post('/cart', (req,res) => {
    const { idProduct, ProductName, SalePrice, Image1, quantity, username } = req.body;
    var data = {
        idProduct: idProduct,
        ProductName: ProductName,
        SalePrice: SalePrice,
        Image1: Image1,
        quantity: quantity,
        username: username
    }
    var sql2 = `select * from cart where username = '${username}' and idProduct = '${idProduct}';;`;
    conn.query(sql2, (err2, results2) => {
        if (err2) throw err2;
        if(results2 != "") {
            var sql3 = `update cart set quantity = quantity + ${quantity} where username = '${username}' and idProduct = '${idProduct}';`;
            conn.query(sql3, (err3, results3) => {
                if (err3) throw err3;
                var sql4 = `select * from cart;`;
                conn.query(sql4, (err4, results4) => {
                    if(err4) throw err4;
                    res.send(results4);
                })
            })
        }
        else {
            var sql = 'INSERT INTO cart SET ?;';
            conn.query(sql, data, (err,results) => {
                if (err) throw err;
                var sql1 = `select * from cart;`;
                conn.query(sql1, (err1, results1) => {
                    if(err1) throw err1;
                    res.send(results1);
                })
            })
        }
    })
});

app.put('/cart/:id', (req,res) => {
    const { quantity } = req.body;
    var data = { quantity: quantity }
    var sql = `update cart set ? where idCart = '${req.params.id}';`
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(results);
        // var sql1 = `select * from cart where username = '${req.params.username}';`;
        // conn.query(sql1, (err1, results1) => {
        //     if(err1) throw err1;
        //     res.send(results1);
        // })
    })
}); 

app.delete('/cart/:id', (req,res) => {
    var sql = `delete from cart where idCart = '${req.params.id}';`
    conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
        // var sql1 = `select * from products where ProductName like '%${req.query.ProductName}%';`;
        // conn.query(sql1, (err1, results1) => {
        //     if(err1) throw err1;
        //     console.log(req.query.ProductName);
        //     console.log(results1);
        //     res.send(results1);
        // })
    })
});


app.post('/checkout', (req,res) => {
    const { username, TotalPrice } = req.body;
    var data = { username, TotalPrice }
    var sql = `insert into transaction set ?;`;
    conn.query(sql, data, (err,results) => {
        if (err) throw err;
        var sql1 = `select (select max(idTransaction) from transaction where username = '${username}') as idTransaction,
                    ProductName, Image1, SalePrice, quantity from cart where username = '${username}';;`
        conn.query(sql1, (err1,results1) => {
            if (err1) throw err1;
            console.log(results1)

            var sql2 = `insert into transdetail (idTransaction, ProductName, Image1, SalePrice, quantity) values ?;`;
            var values = []
            results1.map(data => {
                values.push([data.idTransaction ,data.ProductName, data.Image1, data.SalePrice, data.quantity])
            })
            console.log(values)
            conn.query(sql2, [values], (err2,results2) => {
                if (err2) throw err2;
                console.log(results2);

                var sql3 = `delete from cart where username = '${username}';`;
                conn.query(sql3, (err3,results3) => {
                    if (err3) throw err3;
                    res.send(results3);
                })
            })
        })
    })
})


// =========================================== User Transaction History ==========================================================
app.get('/userhistory/:username', (req,res) => {
    var sql = `select (@cnt := @cnt + 1) AS TransactionID, idTransaction, TotalPrice
                from transaction JOIN (SELECT @cnt := 0) AS dummy
                where username = '${req.params.username}';`
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/userhistorydetail/:id', (req,res) => {
    const { id } = req.params
    var sql = `select * from transdetail where idTransaction = '${id}';`;
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results);
    })
})


// =============================================== Notification Cart ==================================================================
// app.get('/notification/:username', (req,res) => {
//     var sql = `select username, count(*) as CartQuantity from cart where username = '${req.params.username}';`;
//     conn.query(sql, (err,results) => {
//         if (err) throw err;
//         res.send(results);
//     })
// });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

