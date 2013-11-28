# Corgi

Modern system and service monitoring built on node.

![ScreenShot](https://raw.github.com/shepherds/corgi/master/docs/assets/Corgi.png)

**Modern system and service monitoring with data center planning and forecasting built-in.** Built using the power of Node.js
with a modern, clean interface that allows for mobile support.

Corgi is intended as an alternative to Nagios with a focus on modern interface and ease of use.

Check the <a href="https://github.com/shepherds/corgi/wiki/Change-log" target="_blank">change log in the wiki</a> to see details about the latest release.

## Features
* Supports both desktop and mobile screens.
* Setup in 15 minutes or less.
* Users and Groups with permissioning at all levels.
* Ability to have real-time enviromental monitoring.
* Data center planning and forecasting module.
* Various widgets to allow for immediate details at all levels on systems and services.
* Built to be scalable and fast!

## Installation

Start the server with `node corgi.js`.
Direct a browser on the same machine to [http://0.0.0.0:3000/](http://0.0.0.0:3000/).

## API
TODO

## Testing

## Browser support

Compatible OS/Browsers:
* Linux/Chrome
* Linux/Firefox
* iOS/Safari
* iOS/Chrome
* Android/Chrome

## Dependencies

Be sure to run `npm install && bower install` to fetch the latest dependencies.
Afterwards, be sure to build sockjs-client per [the instructions](https://github.com/sockjs/sockjs-client#development-and-testing).

```shell
cd public/vendor/sockjs-client
echo "echo \\" | cat - version > VERSION-GEN
npm install
npm install --dev
make sockjs.js
```

This application was built using node 0.10.21.

## Performance

## Memory footprint

## Wigets

## License 

(The MIT License)

Copyright (c) 2013 Louis Chatriot &lt;louis.chatriot@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.