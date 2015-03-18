# cbmi-impress
The Regenstrief CBMI internal monitor

This uses a library called impress.js. We have hooks for posters, quotes, announcements and iframes.

Creating new 'slides' involves creating a new step with impress. The only thing to watch for is the `data-x` attributes. 
Obviously impress allows for some more complexity, but I've just been moving along the x-axis, offset by 2000 (to account for the 
monitor size). It should be pretty straightforward to see what I'm doing. This runs on a Python HTTP server, so we make HTTP calls
from local sub-pages.

### Order
Based on the order in the html. Each div has a class `step`.

### Positioning
Based on the `data-x` attribute. Offset by 2000. Always use a unique number

### Timing
The default time is in js/cbmi-impress.js. Right now, it's 20s. If you want to override this time, set the `data-transition-duration`
on your div in milliseconds

### Content
#### iframes
You can also use iframes that are stored in the /slides directory. This is part of .gitignore, so you don't have to store
custom projects in this repo. The challenge is you have to load that on the target machine. If you don't mind putting them
in this repo, feel free to create a new directory.
* Always use .iframe class
* Use .iframe-refresh class if you want the iframe to be refreshed on a regular interval
* Use .dark-iframe class if want a black background

#### Posters
* Images stored under /posters
* Update the array in js/cbmi-impress.js

#### Announcements
* Stored in JSON
* Update data/announcements.json

#### Quotes
* Same as announcements, but stored in quotes.json
