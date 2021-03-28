# Iges importer for THREE.js

## Hello fellow interweb dwellers!

I've been an open source lurker and taker for years, this is my first real attempt to give something back. I've been working on some THREE.Js projects lately and have found the need to import some iges data into my applications. The .iges (sometimes .igs, or .IGS if you are on windows 95) file format has been around forever. IGES stands for Initial Graphics Exchange Specification. I must be losing my googlefoo because I haven't been able to find any libraries that can take a raw iges file and generate the relevant THREE.Js elements. There are some libraries available in Python and C++, but I figured I'd start from scratch. In case you are intersted the latest spec (5.3) was released in 1996, it can be found here. It's only 650 pages!

https://shocksolution.files.wordpress.com/2017/12/iges5-3_fordownload.pdf

If you haven't used THREE.Js you are really missing out, it makes you look like a super hero by creating seriously professional 3D graphics without having to get too close to the metal.

https://threejs.org/

Also have to plug an awesome THREE.Js course available here. It is WELL worth the price of admission! Thanks, Bruno ;)

https://threejs-journey.xyz/

There are newer formats like stp (STEP), but they often require a special license to export (at least from Catia). For fairly simple wireframe geometry iges does just fine. It is well supported among almost all CadCam systems, so it is still a format of choice when interoperating between systems.

Here's a picture of my dogs just to keep y'all interested:

![](https://lh3.googleusercontent.com/K9qUpP65-bqOZCJS4MGsAaHkU9YPvkWNvK3Ed02Vz7N6gKQ001xlaVJVRN3B5ZxhSLYMtlve-oolKaf6jA3pN_OxKU6KktRq9EaDPzw4RnRcw8cy5TYjHFTz77iqHt8oFQz1iyhyRtnWtIgDxiW2Wrx3i5yTGOnekHfStjAgpBVQ1ZbcC3N4sxk7msRw8EAmalDe6SyI6XF6XH0Tuqi48aX9mL5GvgYZR_ifpEgIFGtz0hHO5L_yHY24Yz_PMeybkzyiU6o6fdpq9Uf2p8VOPutaZfJ0tupMB8uD7sMsaVMU6COQGWTScEBDI2igo7TqNbhQWR30w4DRlhIcs7__xtB3OYFu1eeKeA8qXrDQBQSPTdaMdFGh-eUNK7jsoJ1AZzlhkjIMMEgCmJT-bu7TqZJzD6zsM5hyYSTS27W3jzHgKXOyGt6H64ACOyOLcmPPRcVVyj1etK-mcWkLUXdnjbP2CJpeJ2Ds7G3iJv0cI5dC6D_xXOtEmeVuUuznJUDtG7ZGQpqB8a9I31aKT2X1EaJgxBXlP43rYAPZ8i3VkJSXjw12fa82BFoa3oYs5oG8H-brzuRt5qFVLGhOqVOXUK1GP_-tDy8vPf6_mgAMTzqE-ZVZM0iBMo6JAxxm_NXCY_t5zhO2qCqup2Og-O3DuCPIG1Y37FvLfmfUtvtBId2LgTLyegGOvB6sUPPp-0MLDhVDM2_7aSc1oJjKUsoNyss4=w2279-h1283-no?authuser=0)

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

