const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;



//usage: node ./API.js


const accessToken = 'YOUR GITHUB TOKEN'; // <= YOUR GITHUB TOKEN

let reset = new Date(Date.now()).toString();

app.get('/:userId', cors(), function(req, res, next) {
    if (new Date(reset) > new Date(Date.now())) {
        console.log("service not available! [503]");
        res.status(503).send("Service is not available, try again later. ");
        return
    }

    const userId = req.params.userId;
    const query = `
    query {
        rateLimit {
            limit
            cost
            remaining
            resetAt
        }
        user(login:"${userId}") {
            avatarUrl
            login
            name
            url
            followers(first: 100) {
                nodes {
                    avatarUrl
                    login
                    name
                    url
                }
                totalCount
            }
            following(first: 100) {
                nodes {
                    avatarUrl
                    login
                    name
                    url
                }
                totalCount
            }
        }
    }`;
    fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify({query}),
      headers: {
        'Authorization': `token ${accessToken}`,
      },
    }).then(response => response.text())
        .then(body => {
            body = JSON.parse(body);
            if (body.data.rateLimit.remaining > 100){
                console.log(`query for ${userId} [200]`,body.data.rateLimit.remaining, body.data.rateLimit.cost);
                body.data.rateLimit = undefined;
                res.set('Content-Type', 'application/json');
                res.status(200).send(new Buffer(JSON.stringify(body)));
            }
            else {
                console.log("service not available! [503]");
                res.status(503).send("Service is not available, try again later.");
                reset = body.data.rateLimit.resetAt;
            }
        })
        .catch(error => () => {
           res.status(500).send(error);
           console.error(error)
        });
});



app.listen(port, () => console.log(`Backend listening on port ${port}!`));
