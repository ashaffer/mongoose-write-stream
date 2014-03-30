var through = require('through');

module.exports = function(schema, options) {
  schema.static('writeStream', function() {
    var model = this;
    return through(function(data) {
      var stream = this;
      model.create(data, function(err, res) {
        err ? stream.emit('error', err)
            : stream.emit('data', data);
      });
    });
  });
};