# Iges importer for THREE.js

## Updates 3/28/21

Import works for the following iges types
100 - Circular Arcs (including 124 transformation matrices)
110 - Lines
116 - Points

Still working on 102 Composite curves as well as name properties 406


## Hello fellow interweb dwellers!

I've been an open source lurker and taker for years, this is my first real attempt to give something back. I've been working on some THREE.Js projects lately and have found the need to import some iges data into my applications. The .iges (sometimes .igs, or .IGS if you are on windows 95) file format has been around forever. IGES stands for Initial Graphics Exchange Specification. I must be losing my googlefoo because I haven't been able to find any libraries that can take a raw iges file and generate the relevant THREE.Js elements. There are some libraries available in Python and C++, but I figured I'd start from scratch. In case you are intersted the latest spec (5.3) was released in 1996, it can be found here. It's only 650 pages!

https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf

If you haven't used THREE.Js you are really missing out, it makes you look like a super hero by creating seriously professional 3D graphics without having to get too close to the metal.

https://threejs.org/

Also have to plug an awesome THREE.Js course available here. It is WELL worth the price of admission! Thanks, Bruno ;)

https://threejs-journey.xyz/

There are newer formats like stp (STEP), but they often require a special license to export (at least from Catia). For fairly simple wireframe geometry iges does just fine. It is well supported among almost all CadCam systems, so it is still a format of choice when interoperating between systems.

Here's a picture of my dogs just to keep y'all interested:

![](https://lh3.googleusercontent.com/pw/ACtC-3cKat657mJta5EN3rGaByOek3Nw3LqnfiSo43gG9Qa5rSmxbr-0HQVmbc5QIWH7bzTU1GQc6o13Zuo_QcOjneP7hUD7QHn8uR2I-PiA6S7NcZ6Bc43zTKVJWeVjq8bjaW4WisBhfvV_6E74mjhdMxeFYA=w1666-h937-no?authuser=0)

and can't leave out my chickens:

![](https://lh3.googleusercontent.com/pw/ACtC-3fEEYVj_h58QbfUbn3gb59iVlxqGMNnAW448wZk5rAgwMVtcMsOvvhXYq03XiuTTlpeb-hxcCEAWhHr1XoTkkzvCOblInYz0pCJPvTWVMRppmH3JkO-p3IHpWD_3n1g2K_WZheH7n-eCTPj-Corn4CRQA=w2273-h1944-no)

# built on Vite and Typescript

Vite is just awesome, you can't beat the minimalist configuration (check out the size of the vite.config file if you don't believe me).

Haha, did you go looking for it? There isn't one, sweet defaults ftw! Not that I actually know anything, but the node_modules directory seems much lighter than other build tools/frameworks. How long did that npm install take? If you think that was cool, wait till you see how fast the initial dev build is! The hot reloads are equally life altering.

## Setup

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:3400
npm run dev

# Build for production
npm run build
```

# Stay Tuned!

Famous last words, I'm sure. As of this writing, I'm just getting through the parsing phase. I will most likely only have the basic wireframe entities working anytime soon.  I'll be working on this in my spare time, so no guarantees.  Hopefully whatever I get done will be of some use to someone somewhere.



#### A parting quote:


> 
> Aspire to be the person your dog(s) think that you are. 
> 

-anonymous dog owner

