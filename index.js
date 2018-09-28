'use strict';

module.exports = function mongooseLeanId(schema) {
  schema.post('find', attachId);
  schema.post('findOne', attachId);
  schema.post('findOneAndUpdate', attachId);
};

function attachId(res) {
  if (res == null) {
    return;
  }

  if (this._mongooseOptions.lean) {
    if (Array.isArray(res)) {
      for (var i = 0, len = res.length; i < len; i++) {
        if (res[i]._id) {
          res[i].id = res[i]._id.toString();
        }
      }
    } else if (res._id) {
      res.id = res._id.toString();
    }
  }
}
