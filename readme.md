# Iges importer for THREE.js

## Hello fellow interweb dwellers!

I've been an open source lurker and taker for years, this is my first real attempt to give something back.  I've been working on some THREE.Js projects lately and have found the need to import some iges (or igs) data into my applications.  If you haven't used THREE.Js you are really missing out, it makes you look like a super hero by creating seriously professional 3D graphics without having to get to close to the metal.

https://threejs.org/

Also have to plug an awesome THREE.Js course available here.  It is WELL worth the price of admission!
https://threejs-journey.xyz/

About IGES, I must be losing my googlefoo because I haven't been able to find any libraries that can take a raw iges file and generate the relevant THREE.Js elements.  Iges has been around for a LONG time, the latest spec (5.3) was released in 1996.

https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf

There are newer formats like stp (STEP), but they often require a special license to export (at least from Catia).  For fairly simple wireframe geometry iges is the ticket.  It is well supported among almost all CadCam systems, so it is the format of choice when interoperating between systems.

Here's a picture of my dogs just to keep y'all interested:
![https://photos.app.goo.gl/AG1B6cm26SvND6Qu6]

## built on Vite and Typescript

## Setup

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:3400
npm run dev

# Build for production
npm run build
```

## The rest of the story....
