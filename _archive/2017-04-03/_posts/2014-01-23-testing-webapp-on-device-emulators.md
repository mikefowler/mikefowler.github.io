---
layout: article
title: "Testing your webapp with device emulators"
category: thoughts
excerpt: Unless you've got a truckload of physical devices to test your webapp on, device emulators are the easiest option to get started testing on different platforms. Here are a few.
---

As mentioned in a previous post about [page transitions in Backbone]({% post_url 2013-11-18-page-transitions-in-backbone %}), I've been working a lot lately on a [webapp](http://css-tricks.com/poll-results-sites-vs-apps/). Because of this, I have a need to test on a bunch of (read: as many as I possibly can) devices. And while it would be ideal to have a dump truck of Android and iOS devices at my disposal, always charged and pointed at my local development URL, it's not entirely feasible for a single developer or a small team.

So… one of your first and best options is to start by testing in the emulators provided by Apple, Google and Mozilla as part of their development SDKs: Xcode, ADT (Android Developer Tools) and Firefox OS Simulator, respectively. *Note*: you won't be able to use the official iOS emulator unless you're on OSX, just in case that wasn't obvious.

## iOS

Unsurprisingly, it's a fairly frictionless experience to get Apple's device emulator up and running, even if it *is* a bit buried in the utility folders of Xcode. The only dependency here is installing Xcode, which you can do easily from the App Store. If you're installing Xcode for the first time, allow some time for this, as the download is pretty hefty (we're talking a couple gigabytes).

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

Cool. Now you have the emulator open. The `Hardware` item on your menu bar provides options for switching between devices (iPad or iPhone, retina, etc…) and rotating, while the `Debug` menu allows you to simulate location. The only bummer here is that you don't have the ability to install apps from the iOS App Store, so you can really only test using Safari.

![Screenshot of iOS emulator running](http://f.cl.ly/items/0K04143a3B2X0G1l232H/Screen%20Shot%202013-12-11%20at%206.25.24%20PM.png)

## Android

The need for testing on an Android emulator is what inspired this post, and in reality is possibly the most important platform for testing a webapp on. While it's miraculous and a joy to see how well transitions, animations and transforms perform on iOS devices in your webapp, it's often a different story when it comes to Android devices.

### AVD (Android Virtual Devices)

To be honest, the original intent of this article was to walk through setting up the AVD emulator on OSX, but after running into issues myself, a fair bit of subsequent Googling and head-scratching, I ran across something far better thanks for [Infinum's great blog post](http://www.infinum.co/the-capsized-eight/articles/is-your-android-emulator-just-too-slow).

### GenyMotion!

Genymobile, a company based in Paris, has been working on what they dub “the faster Android emulator”, [Genymotion](http://www.genymotion.com/). For comparison, during my attempts to get an AVD working, it took several *minutes* just to boot to the home screen of an emulated device, and interacting with it was almost impossible due to lag. It took me less time to install Genymotion, start to finish, and boot up my first device.

While Genymobile is offering paid versions of the app as well, the free version is essentially full-featured. After [downloading the appropriate installer](https://cloud.genymotion.com/page/launchpad/download/) for your system, install the app as usual. If you're on OSX or Linux you'll need to separately install [VirtualBox](https://www.virtualbox.org/wiki/Downloads), which Genymotion uses in the background to spin up your virtual devices (they're basically putting a GUI on something that you could technically do on your own using VirtualBox and some patience).

With a [little extra work](http://stackoverflow.com/questions/20121883/how-to-install-google-play-service-in-the-genymotion-ubuntu-13-04-currently-i) you can even flash your emulated device to include Google's stock apps, enabling you to install apps from Google Play.

## Firefox OS

The new player in the device world is Firefox OS. The neat thing here is that if you have Firefox installed for testing (and you do, right?) then you're only a click away from having the Firefox OS emulator. If you're using Firefox 25 or less, head to the Mozilla add-ons site and install the [Firefox OS Simulator](https://addons.mozilla.org/en-US/firefox/addon/firefox-os-simulator/) add-on. If you're updated, you should be at Firefox 26+, and the tool is now built into the developer tools as the “App Manager”, though you'll still have to install an emulator, a painless process that you'll be gently guided through when you try to start an emulator for the first time.

For those using the Simulator add-on, you'll find it, on the toolbar, under `Tools > Web Developer > Firefox OS Simulator`. Those with the packaged App Manager will find it, likewise, under `Tools > Web Developer > App Manager`.

In either case, launching the tool brings you to the “Dashboard”, which allows you to launch the Simulator, as well as “install” and debug apps, both packaged local apps or remotely hosted. The App Manager in Firefox 26+ also allows you to debug on your actual hardware device as detailed [here](https://hacks.mozilla.org/2013/10/introducing-the-firefox-os-app-manager/). Once the device is up and running, you can run your own apps and test in the built-in browser.

![The Firefox OS Simulator up and running](http://cl.ly/image/361u0A2h310D/Screen%20Shot%202014-01-23%20at%206.17.25%20PM.png)

## Notable mention: Ripple Emulator

Ripple is a suite of tools for testing webapps within Google Chrome, and as such comes in the form of an [extension](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc?hl=en). While the suite is still incredibly useful and fairly comprehensive, it should be noted that the extension hasn't been updated in some time (since March 8, 2013, as of this writing), and that the Chrome developer tools (and indeed, those of most major browsers) are quickly growing to encompass most of what you'll find in Ripple.

If you're using any additional tools to test your webapps, I'd love to know about them!
