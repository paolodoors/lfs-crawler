#!/bin/bash
set -ex

CHROME_DOWNLOAD_PATH=~/Downloads/

if [ "$1" == "-r" ]; then
	rm ${CHROME_DOWNLOAD_PATH}/LF*.html 2> /dev/null
else
	echo -n "Copying html ... "
	rm -rf ./html/ ./md/
	mkdir -p ./html/{orig,clean}
	mv ${CHROME_DOWNLOAD_PATH}/LF*.html html/orig #2> /dev/null
#	rm html/clean/* 2> /dev/null
#	rm -f md/* 2> /dev/null
	cp html/orig/* html/clean/
	rename 's/_popup.html$/_popup (0).html/' html/clean/*.html || true
	echo "ok"
fi
echo -n "Cleaning html ... "
python clean.py
echo "ok"

echo -n "Creating result ... "
python join.py
echo "ok"

echo -n "Backing up original htmls ... "
mkdir -p out/htmls/
cp -pr html/orig/* out/htmls/
echo "ok"
