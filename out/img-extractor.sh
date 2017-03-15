#!/bin/bash
set -ex

TMP1=./img-list.txt
TMP2=./img-tmp.txt
FOLDER=./imgs/

rm -f ${TMP1} ${TMP2}
rm -rf ${FOLDER}

#find ./htmls/ -type f -exec grep -o '<img[ ]*src="[^"]*"' {} >> ${TMP2} \;
#cat ${TMP2} | cut -d= -f 2 > ${TMP1}
find ./htmls/ -type f -exec grep -Eoi '<img [^>]+>' {} >> ${TMP2} \;
grep -Eo 'src="[^\"]+"' ${TMP2} | cut -d= -f 2 > ${TMP1}
cat ${TMP1} | cut -d\" -f 2 > ${TMP2}
sort ${TMP2} | uniq > ${TMP1}

mkdir ${FOLDER}
wget -nc -i ${TMP1} --directory-prefix=${FOLDER}

rm ${TMP1} ${TMP2}
