const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.status(200).send(quote);
});

app.get("/api/quotes", (req, res, next) => {
  if (Object.keys(req.query).length !== 0) {
    const quotesByPerson = quotes.filter((quote) => {
      return quote.person === req.query.person;
    });
    res.send(quotesByPerson);
  } else {
    res.send(quotes);
  }
});

app.post("/api/quotes", (req, res, next) => {
  const person = req.query.person;
  const quote = req.query.quote;
  if (person && quote) {
    const newQuote = { person: person, quote: quote };
    quotes.push(newQuote);
    res.send(newQuote);
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
