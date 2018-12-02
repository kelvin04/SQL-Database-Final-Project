const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
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
});

const storeage = multer.diskStorage({
    destination: '../public/Payment Slip Uploads',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storeage,
    // limits file size 2 MB
    limits: { fileSize: 2000000 },
    fileFilter : function(req, file, cb) {
        chceckFileType(file, cb);
    }  
}).single('paymentSlip');

chceckFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('Error: Images Only');
    }
}

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
    const { username, fullname, email, password } = req.body;
    var data = {
        username: username,
        fullname: fullname,
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
    var sql = 'select * from products;';
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/hotlist', (req, res) => {
    var sql = 'select * from products where NormalPrice = 0;';
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

app.get('/allGameConsoles', (req, res) => {
    var sql = `select * from products where CategoryID like '3';`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/productsdetail/:id', (req, res) => {
    var id = req.params.id
    var sql = `select * from products join categories on CategoryID = idCategories where idProduct = '${id}';`;
    conn.query(sql, (err, results) => {
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
    if(namabrand === "All Products") {
        var sql = `select * from products order by ProductName;`;
    }
    else if (namabrand === "New Products") {
        var sql = `select * from products where NormalPrice = 0 order by ProductName;`;
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
    else if (namabrand === "New Products") {
        var sql = `select * from products where NormalPrice = 0 order by ProductName DESC;`;
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
    else if (namabrand === "New Products") {
        var sql = `select * from products where NormalPrice = 0 order by SalePrice + 0;`;
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
    else if (namabrand === "New Products") {
        var sql = `select * from products where NormalPrice = 0 order by SalePrice + 0 DESC;`;
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
        res.send(results)
    })
})


// ================================== Search Product ==========================================================================
// app.get('/search', (req,res) => {
//     var sql = `select * from products where ProductName like '%${req.query.ProductName}%';`;
//     conn.query(sql, (err,results) => {
//         if(err) throw err;
//         res.send(results)
//     })
// })

app.get('/searchresults/:string', (req,res) => {
    var sql = `select * from products where ProductName like '%${req.params.string}%';`;
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send(results);
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
        res.send(results);
    })
})

app.get('/courierfilter', (req,res) => {
    const { Courier, username } = req.query;
    if(username === "") {
        var sql = `select * from transaction where Courier = '${Courier}';`;
        conn.query(sql, (err,results) => {
            if (err) throw err;
            res.send(results);
        })
    }
    else {
        var sql = `select * from transaction where Courier = '${Courier}' and username = '${username}';`;
        conn.query(sql, (err,results) => {
            if (err) throw err;
            res.send(results);
        })
    }
})

app.get('/adminSortTotalPrice', (req,res) => {
    const { username } = req.query;
    if(username === "") {
        var sql = `select * from transaction order by TotalPrice;`;
        conn.query(sql, (err,results) => {
            if (err) throw err;
            res.send(results);
        })
    }
    else {
        var sql = `select * from transaction where username = '${username}'order by TotalPrice;`;
        conn.query(sql, (err,results) => {
            if (err) throw err;
            res.send(results);
        })
    }
})

app.get('/adminSortTotalPriceDesc', (req,res) => {
    const { username } = req.query;
    if(username === "") {
        var sql = `select * from transaction order by TotalPrice DESC;`;
        conn.query(sql, (err,results) => {
            if (err) throw err;
            res.send(results);
        })
    }
    else {
        var sql = `select * from transaction where username = '${username}'order by TotalPrice DESC;`;
        conn.query(sql, (err,results) => {
            if (err) throw err;
            res.send(results);
        })
    }
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
    const { quantity, username } = req.body;
    var data = { quantity: quantity }
    var sql = `update cart set ? where idCart = '${req.params.id}';`
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        var sql1 = `select * from cart where username = '${username}';`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            res.send(results1);
        })
    })
}); 

app.delete('/cart/:id', (req,res) => {
    const { username } = req.body;
    var sql = `delete from cart where idCart = '${req.params.id}';`
    conn.query(sql, (err, results) => {
        if(err) throw err;
        var sql1 = `select * from cart where username = '${username}';`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            res.send(results1);
        })
    })
});


app.post('/checkout', (req,res) => {
    const { username, Address, Courier, TotalPrice, Status } = req.body;
    // var data = { username, Address, Courier, TotalPrice };
    var sql = `insert into transaction 
                (username, Date, Time, Address, Courier, TotalPrice, Status)        
                values ('${username}', (select CURDATE()), (select CURTIME()),'${Address}', '${Courier}', ${TotalPrice}, '${Status}');`;
    conn.query(sql, (err,results) => {
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


// ========================================= User Profile & Transaction History ==========================================================
app.get('/userhistory/:username', (req,res) => {
    var sql = `select (@cnt := @cnt + 1) AS TransactionID, idTransaction, Date, Time, Address, Courier, TotalPrice, Status
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

app.get('/statusPayment/:id', (req,res) => {
    const { id } = req.params
    var sql = `select * from transaction where idTransaction = '${id}';`;
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results);
    })
})


app.get('/userprofile/:username', (req,res) => {
    var sql = `select * from userlist where username = '${req.params.username}';`
    conn.query(sql, (err,results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.put('/updateprofile/:idUser', (req, res) => {
    const { username, address } = req.body;
    var data = { address }
    var sql = `update userlist set ? where id = ${req.params.idUser};`;
    conn.query(sql, data, (err,results) => {
        if (err) throw err;
        
        var sql1 = `select * from userlist where username = '${username}';`;
        conn.query(sql1, (err1,results1) => {
            if (err1) throw err1;
            res.send(results1)
        })
    })
})


// ======================================== Payment ===============================================================
app.get('/adminpayment/:id', (req, res) => {
    var sql = `select p.*, t.TotalPrice from payment p join transaction t 
               on p.idTransaction = t.idTransaction where p.idTransaction = ${req.params.id};`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.post('/addNewInvoice/:id', (req, res) => {
    const { idTransaction, InvNumber } = req.body;
    var data = { idTransaction, InvNumber }
    var sql = `insert into invoice set ?;`;
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/getInvoiceNumber/:id', (req, res) => {
    var sql = `select i.*, t.Date, t.TotalPrice, t.Address, t.Courier, t.username from invoice i join transaction t 
                on i.idTransaction = t.idTransaction where i.idTransaction = ${req.params.id};`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.put('/adminConfirmationPayment/:id', (req, res) => {
    const { Status } = req.body;
    var sql = `update transaction set Status = '${Status}' where idTransaction = ${req.params.id};`;
    conn.query(sql, (err, results) => {
        if (err) throw err;
        
        var sql1 = `select * from transaction;`;
        conn.query(sql1, (err1, results1) => {
            if (err1) throw err1;
            res.send(results1);
        })
    })
})

app.get('/payment/:username', (req,res) => {
    var sql = `select * from transaction where username = '${req.params.username}' and Status = 'Waiting for Payment';`
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.put('/updatePaymentStatus/:id', (req, res) => {
    const { username, Status } = req.body;
    var data = { username, Status };
    var sql = `update transaction set Status = '${Status}' where idTransaction = ${req.params.id};`;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        var sql1 = `select (@cnt := @cnt + 1) AS TransactionID, idTransaction, Date, Time, Address, Courier, TotalPrice, Status
                    from transaction JOIN (SELECT @cnt := 0) AS dummy
                    where username = '${username}';`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            res.send(results1);
        })
    })
})

app.post('/uploadPaymentData', (req, res) => {
    const { idTransaction, Method, FromBankAccount, FromNumAccount, FromNameAccount, AccountDestination, AmountPaid } = req.body;
    var data  = { idTransaction, Method, FromBankAccount, FromNumAccount, FromNameAccount, AccountDestination, AmountPaid }
    var sql = 'insert into payment set ?';
    conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send('Upload Success!');
    })
})

app.post('/uploadPaymentImage', (req, res) => {
    upload(req, res, (err) =>{
        if(err) {
            console.log(err);
        }
        else {
            console.log(req.file);
            res.send('test');
            
            var sql1 = `update payment a, 
                        (select (select max(idPayment) from payment) as idPayment) b set PaymentSlip = '${req.file.filename}' 
                        where a.idPayment = b.idPayment`;
            conn.query(sql1, (err1, results1) => {
                if (err1) throw err1;
                console.log(results1)
            })
        }
    })
})

// =============================================== Notification Cart ==================================================================
// app.get('/notification/:username', (req,res) => {
//     var sql = `select username, count(*) as CartQuantity from cart where username = '${req.params.username}';`;
//     conn.query(sql, (err,results) => {
//         if (err) throw err;
//         res.send(results);
//         console.log(results)
//     })
// });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

