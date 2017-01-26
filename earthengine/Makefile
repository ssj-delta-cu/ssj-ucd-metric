#! /usr/bin/make -f

# This is a bit hackish as a way to get the bb_transmit values
include tsw.mk

date:=2014-10-12

mdy=$(shell echo ${date} | cut -d'-' -f2)$(shell echo ${date} | cut -d'-' -f3)$(shell echo ${date} | cut -d'-' -f1)
project:=BD
landsat:=L8
suf:=${mdy}_P44R33_${landsat}_${project}
ee:=ssj_metric_${date}.tif
lc:=landuse_2015.tif

lc_img:=landcover_${suf}.img
bb.sca:=bb_transm_${suf}.sca

GT:=gdal_translate -ot Float32 -of HFA #-b 6 metric_2015-08-12.tif albedo.img

products:=reflectance_surf albedo_surf ndvi ndwi lai emis_bb ts ts_dem
imgs:=$(patsubst %,%_${suf}.img,${products})

bands.reflectance_surf:=1 2 3 4 5 6 7
bands.albedo_surf:=8
bands.ndvi:=9
bands.ndwi:=10
bands.lai:=11
bands.emis_bb:=12
bands.ts:=13
bands.ts_dem:=14

#0: "blue", double, EPSG:4326, 3x3 px
#1: "green", double, EPSG:4326, 3x3 px
#2: "red", double, EPSG:4326, 3x3 px
#3: "nir", double, EPSG:4326, 3x3 px
#4: "swir1", double, EPSG:4326, 3x3 px
#5: "temp", double, EPSG:4326, 3x3 px
#6: "swir2", double, EPSG:4326, 3x3 px
#7: "albedo", double, EPSG:4326
#8: "ndvi", double, EPSG:4326, 3x3 px
#9: "ndwi", double, EPSG:4326, 3x3 px
#10: "lai", double, EPSG:4326
#11: "e0", double, EPSG:4326
#12: "Ts", double, EPSG:4326, 3x3 px
#13: "Ts_dem", double, EPSG:4326, 3x3 px

.PHONY:img INFO
INFO::
	@echo imgs:${imgs}
	@echo run like:
	@echo for d in `ls ssj_metric_*.tif | cut -d_ -f 2 | cut -d. -f 1`; do make date=$d zip; done

img:${imgs} ${lc_img} ${bb.sca}

${imgs}:%_${suf}.img:${ee}
	${GT} $(foreach b,${bands.$*},-b $b) ${ee} $@

lc:${lc_img}
${lc_img}:${lc}
	${GT} -b 2 $< $@

zip:${suf}.zip

bb.sca:${bb.sca}
${bb.sca}:
	echo ${tsw.${date}} > $@

${suf}.zip:${imgs} ${lc_img} ${bb.sca}
	zip ${suf}.zip ${imgs}
	zip ${suf}.zip landcover_${suf}.img
	zip ${suf}.zip ${bb.sca}

clean:
	rm -f ${imgs} ${lc_img} $(patsubst %,%.aux.xml,${imgs} ${lc_img}) ${bb.sca} 
