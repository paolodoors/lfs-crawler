lfs-crawler allows to save LF courses for offline use
=====================================================

Linux Foundation online training courses are entirely designed to be
accessed online via _360training.com_ platform. This project serves to
automate text extraction of the course materials for offline use and
it's conversion to a clean and more manageable html format.

## Acknowledgment:

This is the fork of https://github.com/s-nt-s/LFS201 repository
(originally in Spanish) adapted for English versions of several LF
online training courses (currently: **LFS201**, **LFS211**,
**LFS216**, **LFS265**, **LFC191**). See all the previous credits in
original repository (or here in _LFCS/APUNTES.md_ for example), I have
only adapted the project to English version (partially) and added
support for more courses.

**WARNING**: All rights on the courses materials belongs to the Linux
Foundation. I will not publish this materials on public for
everyone. You can use this project only if you got access to the
supported courses from Linux Foundation and want to save some
important information for future preparation for LF certification
(LFCS, LFCE, etc &mdash; see
https://training.linuxfoundation.org/certification).

## Pre-Requirements:

* First, you should have access to one of the supported LF online
  training courses, otherwise don't use this project.

* In order to use the project you should install Chrome/Chromium web
  browser.

* Checkout appropriate branch for supported LF course.

* You will need to set some preferences in Chrome/Chromium browser and
  project files:

  * disable the option _"Ask where to save each file before
  downloading"_ in browser settings;

  * set _"Download location"_ in browser settings and set the same
   value to **CHROME_DOWNLOAD_PATH** variable in `run.sh` script;

  * use _"Load unpacked extension"_ in Chrome/Chromium Extensions
   tab and add `chrome` folder of this project;

  * With subsequent use of this Chrome/Chromium extension (named
   **Autosave**) on request you should allow multiple files to be saved
   (depends on Chrome/Chromium version).

## How to use:

1. First, with **Autosave** Chrome/Chromium extension enabled just
  start your LF online training course:

  * In course window the **Autosave** extension should start
  navigating the slides one by one and saving rendered content of each
  slide (with some exceptions) in Chrome/Chromium download location;

  * You can stop (by closing the course window or disabling the
  extension) or wait until the course is over and every slide is saved
  to Chrome/Chromium download location.

2. Second, execute `run.sh` script from project folder to perform
  following actions: moving all saved content to the working directory
  (`lfs-crawler/html/{orig,clean}`), cleaning the content by
  simplifying its format with `clean.py`, binding and indexing with
  headers all the modified content to the output directory
  (`lfs-crawler/out/`) with `join.py`.

3. Now you can open the resultant html file from `lfs-crawler/out/`
  and see all the text materials there.

## Limitations:

* For each supported LF training course there is a separate git branch
  (yeah, I was too lazy to merge all the courses support in _master_
  branch). The _lfs201_ branch is the same as _master_ branch, other
  branches usually differ only in 1-2 last commits (different parsing
  methods used).

* By default the auto-navigation feature is on, but the popups will
  not be visited (should be visited manually to get saved). You could
  turn auto-navigation off by commenting out the line
  `setTimeout(this.nav,5000);` in `chrome/content/js.js` and reloading
  the extension (_"Reload"_ link in Extensions tab).

* Some scripts from original Spanish version maybe broken : `obj.py`,
  `fix/mdtohtml.py`, `LFCS/videos.sh` (obsolete links). I didn't
  bother myself trying to port all the project features (pandoc,
  markdown or epub creating; error corrections in `join.py` according
  to the Spanish version; converting original author notes and so on).

* Other scripts are usable or partially usable: `epub.py`,
  `tecmint.py`, `labs.sh`, `run.sh` (executes `clean.py` and
  `join.py`).

* Current version don't save images, audio and video materials &mdash;
  only text is saved.

* Current version have problems with hyperlinks (they're implemented
  as javascript functions with names `hyperlink***`, not as `<a
  href=...>...</a>`).