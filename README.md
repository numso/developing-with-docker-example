Developing with Docker
======================

This is a simple demo showing how you could run your development environment using docker and fig.

As a bonus, it's also a mini-SOA architecture that gets autoconnected. Pretty cool huh.

##Notes

For OSX, Boot2Docker will only allow you to mount directories that are under `/Users` somewhere. So make sure your code's root folder is `/Users`.

```
| /Users/.../
   | - cm/
   | - courses-service/
   | - institution-service/
   | - notifications/
```

##Install

 - Install Boot2Docker and Docker 1.3.x (tested with 1.3.2) (http://boot2docker.io/)
 - Install Fig 1.0.x (tested with 1.0.1) (http://www.fig.sh/)
 - Recommended: Set `dockerhost` in your `/etc/hosts` file

##Run

 - Run `fig build`
 - When that's finished, run `fig up`

Tada! You should now see your server changes live. Try changing something in one of the servers and you'll see the server auto-reboot with your changes. Notice that docker stays up :). No rebooting necessary there.

The client is also hooked up. To see changes there you need to:

 - `cd` into the project you want to edit
 - Run `npm install`
 - If you haven't alread, run `npm install -g webpack`
 - Run `webpack -w`
 - If you're using live reload, run `npm run lr`

Sweetness! Now if you edit any of the client files, you can see the changes in your browser without having to reload docker. Woot Woot!

To see the servers, go to one of these urls:

 - dockerhost:3000
 - dockerhost:4000
 - dockerhost:8080

(if you didn't set dockerhost in /etc/hosts, then that's where you'll put your docker ip)
