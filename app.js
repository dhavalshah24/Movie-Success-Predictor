
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const _=require("lodash");
const fs=require("fs");

const app=express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static( "public"));

mongoose.connect("mongodb://localhost:27017/movieDB",{useNewUrlParser: true,useUnifiedTopology: true});

const movieSchema= new mongoose.Schema ({
  country:String,
  director:String,
  genre:String,
  star:String,
  writer:String,
  success:String
});

const Movie=mongoose.model("Movie",movieSchema);

// const movieData=fs.readFileSync('movies.json');
// const movies=JSON.parse(movieData);
// Movie.insertMany(movies);

app.get("/",function(req,res) {
  res.render("home");
});

var t,h,a,f,dh,da,df,sh,sa,sf,wh,wa,wf,gh,ga,gf,ch,ca,cf,pred;

app.post("/", async function(req,res) {

  var d=req.body.director;
  var s=req.body.star;
  var w=req.body.writer;
  var g=req.body.genre;
  var c=req.body.country;

  d=_.startCase(_.toLower(d));
  s=_.startCase(_.toLower(s));
  w=_.startCase(_.toLower(w));
  g=_.startCase(_.toLower(g));

  if (c=="usa") {
    c="USA";
  } else if (c=="UK") {
    c="UK"
  } else {
    c=_.startCase(_.toLower(c));
  }

  await Movie.countDocuments({},function(err, count) {
    if (!err) {
      t=count;
    }
  });

  await Movie.countDocuments({success:"Hit"},function(err, count) {
    if (!err) {
      h=count;
    }
  });

  await Movie.countDocuments({success:"Average"},function(err, count) {
    if (!err) {
      a=count;
    }
  });

  await Movie.countDocuments({success:"Flop"},function(err, count) {
    if (!err) {
      f=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Hit"},{director:d}]},function(err, count) {
    if (!err) {
      dh=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Average"},{director:d}]},function(err, count) {
    if (!err) {
      da=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Flop"},{director:d}]},function(err, count) {
    if (!err) {
      df=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Hit"},{star:s}]},function(err, count) {
    if (!err) {
      sh=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Average"},{star:s}]},function(err, count) {
    if (!err) {
      sa=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Flop"},{star:s}]},function(err, count) {
    if (!err) {
      sf=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Hit"},{writer:w}]},function(err, count) {
    if (!err) {
      wh=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Average"},{writer:w}]},function(err, count) {
    if (!err) {
      wa=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Flop"},{writer:w}]},function(err, count) {
    if (!err) {
      wf=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Hit"},{genre:g}]},function(err, count) {
    if (!err) {
      gh=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Average"},{genre:g}]},function(err, count) {
    if (!err) {
      ga=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Flop"},{genre:g}]},function(err, count) {
    if (!err) {
      gf=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Hit"},{country:c}]},function(err, count) {
    if (!err) {
      ch=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Average"},{country:c}]},function(err, count) {
    if (!err) {
      ca=count;
    }
  });

  await Movie.countDocuments({$and: [{success:"Flop"},{country:c}]},function(err, count) {
    if (!err) {
      cf=count;
    }
  });

  pxh=(dh/h)*(sh/h)*(wh/h)*(gh/h)*(ch/h);
  pxa=(da/a)*(sa/a)*(wa/a)*(ga/a)*(ca/a);
  pxf=(df/f)*(sf/f)*(wf/f)*(gf/f)*(cf/f);

  ph=pxh*(h/t);
  pa=pxa*(a/t);
  pf=pxf*(f/t);

  // console.log(ph);
  // console.log(pa);
  // console.log(pf);

  if (ph>pa && ph>pf) {
    pred="The movie is going to be HIT! Definitely worth watching"
    console.log("Hit");
  } else if (pa>ph && pa>pf) {
    pred="Average! Take opinion of your friends before watching it"
    console.log("Average");
  } else {
    pred="Flop! Don't waste your time and money on this film"
    console.log("Flop");
  }

  res.redirect("pred")
});

app.get("/pred",function(req,res) {
  res.render("pred",{pred:pred})
});

app.post("/pred",function(req,res) {
  res.redirect("/");
});

app.listen(process.env.PORT||3000,function() {
  console.log("Server started on port 3000");
});
