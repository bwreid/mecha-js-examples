const Joi = require('joi')
module.exports = Joi.object().keys({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  variety: Joi.string().allow([ 'red', 'white', 'rose' ]).required(),
  rating: Joi.number().integer().min(1).max(5)
})
