---
layout: article
title: "Testing your webapp on emulators"
category: thoughts
---

As mentioned in a previous post about [page transitions in Backbone]({% post_url 2013-11-18-page-transitions-in-backbone %}), I've been working a lot lately on a [webapp](http://css-tricks.com/poll-results-sites-vs-apps/). Because of this, I have a need to test on a bunch of (read: as many as I possibly can) devices. And while it would be ideal to have a dump truck of Android and iOS devices at my disposal, always charged and pointed at my local development URL, it's not entirely feasible for a single developer or a small team.

So… one of your first and best options is to start by testing in the emulators provided by Apple, Google and Mozilla as part of their development SDKs: Xcode, ADT (Android Developer Tools) and Firefox OS Simulator, respectively. *Note*: you won't be able to use the official iOS emulator unless you're on OSX, just in case that wasn't obvious.

## iOS

Perhaps unsurprisingly, it's a fairly frictionless experience to get Apple's device emulator up and running, even if it *is* a bit buried in the utility folders of Xcode. The only dependency here is installing Xcode, which you can do easily from the App Store. If you're installing Xcode for the first time, allow some time for this, as the download is pretty hefty (we're talking a couple gigabytes).

Once you have Xcode installed, there are two ways to launch the emulator:

1. Launch Xcode, and then on the menu bar open up `Xcode > Open Developer Tool > iOS Simulator`.  
  
  *OR*:  
    
2. Launch via the command line with the grotesquely long path to the app: 

  ```bash
  open /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone\ Simulator.app
  ```

  If you hate yourself you can commit this path to memory, or alternatively create an alias in your `.bash_profile`, like this:

  ```bash
  alias ios='[command from above]'
  ```

  **Or**, if you happen to use [Alfred](http://alfredapp.com) and want to get *real* fancy, grab the [simple workflow](https://github.com/mikefowler/alfred-workflows) I made. The workflow does the same thing as the two methods above, but opens the app via Applescript instead.

Cool. Now you have the emulator open. The `Hardware` item on your menu bar provides options for switching between devices (iPad or iPhone, retina, etc…) and rotating, while the `Debug` menu allows you to simulate location.

![Screenshot of iOS emulator running](http://f.cl.ly/items/0K04143a3B2X0G1l232H/Screen%20Shot%202013-12-11%20at%206.25.24%20PM.png)

## Android

The need for testing on an Android emulator is what inspired this post, and in reality is possibly the most important platform for testing a webapp on. While it's miraculous and a joy to see how well transitions, animations and transforms perform on iOS devices in your webapp, it's a different story when it comes to Android devices.

### AVD (Android Virtual Devices)

To be honest, the original intent of this article was to walk through setting up the AVD emulator on OSX, but after running into issues myself, a fair bit of subsequent Googling and head-scratching, I ran across something far better thanks for [Infinum's great blog post](http://www.infinum.co/the-capsized-eight/articles/is-your-android-emulator-just-too-slow).

### GenyMotion!

Genymobile, a company based in Paris, has been working on what they dub “the faster Android emulator”, [Genymotion](http://www.genymotion.com/). For comparison, during my attempts to get an AVD working, it took several *minutes* just to boot to the home screen of an emulated device, and interacting with it was almost impossible due to lag. It took me less time to install Genymotion, start to finish, and boot up my first device.

While Genymobile is offering paid versions of the app as well, the free version is essentially full-featured. After [downloading the appropriate installer](https://cloud.genymotion.com/page/launchpad/download/) for your system, install the app as usual. If you're on OSX or Linux you'll need to separately install [VirtualBox](https://www.virtualbox.org/wiki/Downloads), which Genymotion uses in the background to spin up your virtual devices.

With a [little extra work](http://stackoverflow.com/questions/20121883/how-to-install-google-play-service-in-the-genymotion-ubuntu-13-04-currently-i) you can even flash your emulated device to include Google's stock apps, enabling you to install apps from Google Play.
http://stackoverflow.com/questions/20121883/how-to-install-google-play-service-in-the-genymotion-ubuntu-13-04-currently-i

## Firefox OS