
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'eb05461834e941dbad59a9e1c1c67d17'
  });


const handleAPICall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'));
}

const handleImage = (req, res, knex) =>{
    const { id } = req.body;
  knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to count"));
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}