const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// Example:
// posts === {
//   'j12345': {
//     id: 'j12345',
//     title: 'post1',
//     comments: [
//       {id: 'k123', content: 'comment1'}, {id: 'k234', content: 'comment2'}
//     ]
//   },
//   'j23456': {
//     id: 'j23456',
//     title: 'post2',
//     comments: [
//       {id: 'k532', content: 'comment3'}, {id: 'k535', content: 'comment4'}
//     ]
//   }
// }

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});