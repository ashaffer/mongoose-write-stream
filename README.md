mongoose-write-stream
=====================

Super simple mongoose plugin that adds writable streams to your models.

## Example

```javascript
var mongoose = require('mongoose');
var csv      = require('csv-stream');
var request  = require('request');
var zlib     = require('zlib');

mongoose.connect('mongodb://127.0.0.1:27017/example');
mongoose.plugin(require('mongoose-write-stream'));

var Tick = mongoose.model('Tick', {
  time: Number,
  price: Number,
  quantity: Number
});

request('http://api.bitcoincharts.com/v1/csv/bitstampUSD.csv.gz')
  .pipe(zlib.createGunzip())
  .pipe(csv.createStream({
    columns: ['time', 'price', 'quantity']
  }))
  .pipe(Tick.writeStream());
```
