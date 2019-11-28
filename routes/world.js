var express =  require("express");
var router =  express();
var mysql = require("mysql");
var Joi = require("joi");
var config = require("config");

var connection =  mysql.createConnection({
    host: config.get("host"),
    database:config.get("database"),
    user : config.get("user"),
    password:config.get("password")
});
connection.connect();
router.use(express.json());

router.get("/",(request, response)=>{
    var queryText = "select * from CricStatTB";
    
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});

router.get("/:id",(request, response)=>{
    var queryText = `select * from CricStatTB where id = ${request.params.id}`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});


router.post("/",(request, response)=>{
    var validationResult = Validate(request);

    console.log(validationResult.error);
    if(validationResult.error==null)
    {
            var id = request.body.id;
            var Country = request.body.Country;
            var Year = request.body.Year;
            var NoofTeam = request.body.NoofTeam;
            var Venue = request.body.Venue;

            var queryText = `insert into CricStatTB(Country,Year, NoofTeam, Venue) values('${Country}', ${Year}, ${NoofTeam}, '${Venue}')`;
            connection.query(queryText,(err, result)=>{
            if(err==null)
                {
                    response.send(JSON.stringify(result));
                }
                else{
                    response.send(JSON.stringify(err));
                }
        });
    }
    else{
        response.send(JSON.stringify(validationResult.error));
    }
});


function Validate(request)
{
    var validationschema = 
    {
        
        Country:Joi.string().required(),
        Year:Joi.number().required(),
        NoofTeam:Joi.number().required(),
        Venue:Joi.string().required()

    };
   return Joi.validate(request.body, validationschema)
}

router.put("/:id",(request, response)=>{
    var id = request.params.id;
    var Country = request.body.Country;
    var Year= request.body.Year;
    var NoofTeam=request.body.NoofTeam; 
    var Venue=request.body.Venue; 


    var queryText = `update CricStatTB set Country='${Country}', Year=${Year}, NoofTeam=${NoofTeam} , Venue='${Venue}' where id=${id}`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});


router.delete("/:Venue",(request, response)=>{
    var Venue = request.params.Venue;
    var queryText = `delete from CricStatTB where Venue='${Venue}'`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});

module.exports = router;



