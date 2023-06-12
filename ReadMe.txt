----Setup----

Install Node.js from https://nodejs.org/ (use the current LTS)

Once installed run cmd in the folder and run the command "npm install express" without quotes. This will install everything that is needed. 


----Running the Server----

Run runserver.bat

To kill the server close the command line prompt or use CTRL + C

----How to use----

Once the server is running you will be able to visit http://localhost:3000/ (or this this as a browser source in OBS) to view the image

By default this is blank

To change the image you can use the visual changer at http://http://localhost:3000/CardSearch.html or send a GET request with a tool such as StreamDeck by sending the request to http://localhost:3000/image/ch01-001.png replacing CH01-001 with the card you want

This will update the displayed image and after 20 seconds if no futher changes are made it will clear and go back to blank


----Custom Configuration----

Some of these settings can be changed by editing the config file.

timeout - How long in MS before it reverts back to the fallbackImage
fallbackImage - The image you want to be default. The ones added by default are blank.png which is just a transparent image and cardBack.png which is the Achroma card back


