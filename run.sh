#!/bin/bash
set -ex

CHROME_DOWNLOAD_PATH="~/Downloads/"

if [ "$1" == "-r" ]; then
	rm ${CHROME_DOWNLOAD_PATH}/LF*.html 2> /dev/null
else
	echo -n "Copying html ... "
	mv ${CHROME_DOWNLOAD_PATH}/LF*.html html/ori 2> /dev/null
	rm html/clean/* 2> /dev/null
	rm -f md/* 2> /dev/null
	cp html/ori/* html/clean/
	rename 's/_popup.html$/_popup (0).html/' html/clean/*.html
	echo "ok"
fi
echo -n "Cleaning html ... "
python clean.py
echo "ok"

echo -n "Creating result ... "
python join.py
echo "ok"
