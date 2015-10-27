module.exports = {
  getRecords: function(req, res) {
        var pg = require('pg');

        //You can run command "heroku config" to see what is Database URL from Heroku belt

        var conString = process.env.DATABASE_URL || "postgres://postgres:1qaz2wsx@xx.xx.xx.xx:xx/postgres";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select * from song");

        query.on("row", function (row, result) {
            result.addRow(row);
        });

        query.on("end", function (result) {
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();
        });
  },


    addRecord : function(req, res){
        var pg = require('pg');

        var conString = process.env.DATABASE_URL ||  "postgres://postgres:1qaz2wsx@xx.xx.xx.xx:xx/postgres";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("insert into song (title,len,lang,artist,artist_keywords,gender,country,genre,subtitle,release_date,add_date,artist_pic_url,lyrics,composer,rank,propoties) "+
                                "values ('"+req.query.title+"','"+req.query.len+"','"+
                                    req.query.lang+"','"+req.query.artist+"','"+
                                    req.query.artist_keywords+"','"+req.query.gender+"','"+
                                    req.query.country+"','"+req.query.genre+"','"+
                                    req.query.subtitle+"','"+req.query.release_date+"','"+
                                    req.query.add_date+"','"+req.query.artist_pic_url+"','"+
                                    req.query.lyrics+"','"+req.query.composer+"','"+
                                    req.query.rank+"','"+req.query.propoties+"')");

        query.on("end", function (result) {
            client.end();
            res.write('Success');
            res.end();
        });

    },

     delRecord : function(req, res){
        var pg = require('pg');

        var conString = process.env.DATABASE_URL ||  "postgres://postgres:1qaz2wsx@xx.xx.xx.xx:xx/postgres";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query( "Delete from song Where id ="+req.query.id);

        query.on("end", function (result) {
            client.end();
            res.write('Success');
            res.end();
        });

    },

    createTable : function(req, res){
        var pg = require('pg');

        var conString = process.env.DATABASE_URL ||  "postgres://postgres:1qaz2wsx@xx.xx.xx.xx:xx/postgres";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query( "CREATE TABLE song"+
                                    "("+
                                    	"id serial NOT NULL,"+
                                    	"title varchar(128),"+
                                    	"len int2,"+
                                    	"lang varchar(32),"+
                                    	"artist varchar(256),"+
                                    	"artist_keywords varchar(256),"+
                                    	"gender varchar(32),"+
                                    	"country varchar(32),"+
                                    	"genre varchar(32),"+
                                    	"subtitle varchar(256),"+
                                    	"release_date date,"+
                                    	"add_date date,"+
                                    	"artist_pic_url varchar(1024),"+
                                    	"lyrics varchar(256),"+
                                    	"composer varchar(256),"+
                                    	"rank int2,"+
                                    	"propoties int2"+
                                    ")");

        query.on("end", function (result) {
            client.end();
            res.write('Table Schema Created');
            res.end();
        });

    },

    dropTable : function(req, res){
        var pg = require('pg');

        var conString = process.env.DATABASE_URL || "postgres://postgres:1qaz2wsx@xx.xx.xx.xx:xx/postgres";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query( "Drop TABLE song");

        query.on("end", function (result) {
            client.end();
            res.write('Table Schema Deleted');
            res.end();
        });

    }


};
