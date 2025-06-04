import express from 'express';
import dotevn from 'dotenv';
import axios from 'axios';
dotevn.config(); 
const app = express();
const PORT = process.env.PORT ;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/github/stars', (req, res) => {
     console.log("Received a request to /github/star",req.body);
     const content="Hello World!";
     const avatar_url=req.body.repository.owner.avatar_url;
     axios.post(process.env.DISCORD_WEBHOOK_STARS_URL, {
          content:content,
          embeds:[{image:{url:avatar_url}}]
     }).then(response=>{
          console.log("Message sent to Discord");
          res.status(200).send("Message sent to Discord");
     }).catch(error=>{
          console.error("Error sending message to Discord", error);
          res.status(500).send("Error sending message to Discord");
     });
});
app.listen(PORT, () => { 
     console.log(`Server is running on http://localhost:${PORT}`);
});
