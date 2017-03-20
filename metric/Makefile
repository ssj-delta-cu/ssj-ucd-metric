#! /usr/bin/make -f
dates:= 2014-10-12 2014-10-28 2014-12-31 \
2015-03-05 2015-03-21 2015-04-22 \
2015-05-08 2015-05-24 2015-06-25 \
2015-07-11 2015-07-27 2015-08-12 \
2015-10-31

tifs:=$(patsubst %,%.tif,${dates})

# Create the filenames from the dates
$(foreach d,${dates},$(eval img.$d:=$(shell date --date='$d' +et24_%m%d%Y_P44R33_L8_BD.img)))

define to_tif
tifs::$1
$1:$2
	gdal_calc.py -A $2 --outfile=$1 --calc="10*A" --type='Int16' --co 'COMPRESS=DEFLATE'
endef

# convert to Int16 data
$(foreach d,${dates},$(eval $(call to_tif,$d.tif,${img.$d})))

#upload to earthengine
earthengine:col:=users/ucd-cws-ee-data/ssj-delta-cu/ssj-ucd-metric/et_landsat
earthengine:bucket:=gs://ambell-ssj
earthengine:tifs
	gsutil cp ${tifs} ${bucket}
	for i in ${tifs}; do \
	  d=`basename $$i .tif`; \
	  earthengine upload image --asset_id=${col}/$$d  \
	    --time_start="$$d" --pyramiding_policy=mean \
	    --nodata_value=-32767 ${bucket}/$$i; \
	done
	
INFO:
	echo "img.2014-10-28:=${img.2014-10-28}"
