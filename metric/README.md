### Metric

This contains some steps for post processing the metric output.  These steps
basically upload the data to earth engine with some modifications to match the
standard inputs.

The Makefile needs to be filled with the proper dates. It expects the fileformat
to look like this:

``` bash
$ ls -R P44_R33_34_2015_064/
P44_R33_34_2015_064/:
products

P44_R33_34_2015_064/products:
et24_03052015_P44R33_L8_BD.img	et24_03052015_P44R33_L8_BD.rrd
```

It creates tiff files and uploads them to earthengine
