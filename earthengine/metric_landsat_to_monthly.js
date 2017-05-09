/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var cimis_et0 = ee.ImageCollection("users/ucd-cws-ee-data/ssj-delta-cu/ssj-weather/cimis_eto"),
    et_landsat = ee.ImageCollection("users/ucd-cws-ee-data/ssj-delta-cu/ssj-ucd-metric/et_landsat");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

// ORIGINALLY HOSTED IN GOOGLE EARTH ENGINE - THIS SCRIPT MAY NOT BE THE MOST UP TO DATE, BUT IS INCLUDED HERE FOR REFERENCE.

/* UPDATING FOR A NEW YEAR
 This code handles one year at a time. To update to run a new year, do the following.
 1) Make sure that the


 */

var DELTA = (function () {
    function bbox() {
        return delta_service_region().geometry().bounds();
    }

    function delta_service_region() {
        return ee.FeatureCollection('ft:1OE_ETOZ9Wc2ffFa_B7YWTof9LP2YcuWNcOccSHO7');
    }

    function landsat_crops(ymd) {
        var ic = 'users/qjhart/ssj-delta-cu/ssj-landuse/landuse';
//    var year=ee.Date(ymd).get('year');
        var year = 2015;
        return ee.Image(ic + '/' + year);
    }

    // This function returns the landsat hourly weather data.
    function landsat_hourly(ymd) {
        var weather = {
            "2014-10-12": {
                "ETo": 6.141413802725007,
                "Rnl": -8.074833965868082,
                "Rs": 16.849023924050723,
                "Rso": 17.19746348065337,
                "T": 29.238243415940023,
                "Tdew": 2.5355887333404987,
                "Tn": 13.285676867129824,
                "Tx": 31.905133097620393,
                "U2": 3.14562213420707
            },
            "2014-10-28": {
                "ETo": 2.270843510806665,
                "Rnl": -6.781705769991138,
                "Rs": 14.400445785568328,
                "Rso": 14.634991556548902,
                "T": 18.564412708375098,
                "Tdew": 6.448274153087506,
                "Tn": 6.152932422350653,
                "Tx": 24.822960572048892,
                "U2": 1.2135265700214526
            },
            "2014-12-31": {
                "ETo": 2.4632386635955053,
                "Rnl": -7.5815244672430415,
                "Rs": 9.870663267389633,
                "Rso": 10.058842312123211,
                "T": 7.373749272280456,
                "Tdew": -7.330305648955388,
                "Tn": 0.7613229260569194,
                "Tx": 13.224852692446193,
                "U2": 3.2942683743080465
            },
            "2015-03-05": {
                "ETo": 2.7489531342856983,
                "Rnl": -6.714801671894949,
                "Rs": 18.305165529336715,
                "Rso": 18.685231305459684,
                "T": 14.199681880825013,
                "Tdew": 4.880832160242825,
                "Tn": 3.1141236993635006,
                "Tx": 22.171116362923023,
                "U2": 1.3559238016495674
            },
            "2015-03-21": {
                "ETo": 3.5358406539862006,
                "Rnl": -5.753857393400014,
                "Rs": 19.949927918635627,
                "Rso": 21.715230532609926,
                "T": 21.24564675883299,
                "Tdew": 9.6526099549131,
                "Tn": 9.462068230520295,
                "Tx": 23.567157056625394,
                "U2": 2.0013958475428
            },
            "2015-04-22": {
                "ETo": 4.072573622487447,
                "Rnl": -5.467285113339724,
                "Rs": 24.27621551259214,
                "Rso": 26.69676149965976,
                "T": 21.163449977619912,
                "Tdew": 10.881432578390589,
                "Tn": 9.509657947142863,
                "Tx": 23.307584060954095,
                "U2": 2.0154502686392033
            },
            "2015-05-08": {
                "ETo": 4.3572084138592935,
                "Rnl": -6.273599764666823,
                "Rs": 27.659759454062524,
                "Rso": 28.43845701794821,
                "T": 18.19751722743222,
                "Tdew": 8.378073689745134,
                "Tn": 7.194099943386679,
                "Tx": 22.00683456809108,
                "U2": 1.9074777257581745
            },
            "2015-05-24": {
                "ETo": 5.493602758388578,
                "Rnl": -6.232382706638923,
                "Rs": 29.17601932789242,
                "Rso": 29.660232680109093,
                "T": 23.511468454672087,
                "Tdew": 10.911058581072625,
                "Tn": 10.830723015135776,
                "Tx": 25.361490879072623,
                "U2": 2.986335254776363
            },
            "2015-06-25": {
                "ETo": 7.848904195868183,
                "Rnl": -6.5693297882555,
                "Rs": 29.563772708477412,
                "Rso": 30.411139278539736,
                "T": 35.17161786065045,
                "Tdew": 12.584206200633567,
                "Tn": 16.77147774157036,
                "Tx": 36.80028023816017,
                "U2": 2.2738308299692434
            },
            "2015-07-11": {
                "ETo": 6.2843404362639514,
                "Rnl": -6.076528476909739,
                "Rs": 29.2681643545381,
                "Rso": 29.877152879945918,
                "T": 28.884942626079884,
                "Tdew": 13.084817216602389,
                "Tn": 14.4514203611775,
                "Tx": 28.867044529804765,
                "U2": 2.854330012344026
            },
            "2015-07-27": {
                "ETo": 7.301293889159468,
                "Rnl": -6.81660663706439,
                "Rs": 28.11942126427795,
                "Rso": 28.77145016333927,
                "T": 31.667778668305207,
                "Tdew": 10.58237162423842,
                "Tn": 14.527434833240475,
                "Tx": 34.28068767012947,
                "U2": 2.473390438615961
            },
            "2015-08-12": {
                "ETo": 6.280496208267284,
                "Rnl": -6.568160420510458,
                "Rs": 26.65613548716436,
                "Rso": 27.09887069881281,
                "T": 29.453702715786246,
                "Tdew": 11.208828532576863,
                "Tn": 13.924224846032033,
                "Tx": 31.058955739508427,
                "U2": 2.4974742731193147
            },
            "2015-09-29": {
                "ETo": 3.797627287496832,
                "Rnl": -4.746983766709852,
                "Rs": 15.437160495514782,
                "Rso": 19.633103345477725,
                "T": 26.12323645523491,
                "Tdew": 9.948793669240107,
                "Tn": 13.48357087090143,
                "Tx": 25.279331168666957,
                "U2": 2.467305347746041
            },
            "2015-10-31": {
                "ETo": 3.1428140969809775,
                "Rnl": -6.722925162098409,
                "Rs": 13.957944779537982,
                "Rso": 14.190264970278392,
                "T": 24.78058804359158,
                "Tdew": 9.074691418762297,
                "Tn": 10.216938132577921,
                "Tx": 29.12729982202732,
                "U2": 1.8019562629551618
            },
            "2016-03-23": {
                "ETo": 3.337468917158898,
                "Rnl": -6.432655565984212,
                "Rs": 21.376457587045042,
                "Rso": 22.2369128529016,
                "T": 16.232202018208152,
                "Tdew": 5.791267874990374,
                "Tn": 6.2745244007509005,
                "Tx": 19.9153552349145,
                "U2": 1.9918041960574109
            },
            "2016-05-10": {
                "ETo": 5.534694315460721,
                "Rnl": -6.19561685643565,
                "Rs": 28.218022764311726,
                "Rso": 28.71160104076268,
                "T": 24.84261989831515,
                "Tdew": 11.753037203101638,
                "Tn": 10.7197188882434,
                "Tx": 28.245802020143497,
                "U2": 2.2076877791911715
            },
            "2016-05-26": {
                "ETo": 5.6316712425017155,
                "Rnl": -6.211033943412775,
                "Rs": 29.16418482055063,
                "Rso": 29.813095738949286,
                "T": 24.354822860944175,
                "Tdew": 11.230419089022027,
                "Tn": 10.691490518466557,
                "Tx": 27.326664684955237,
                "U2": 2.315171667988323
            },
            "2016-06-27": {
                "ETo": 7.985726359236198,
                "Rnl": -6.869837595191926,
                "Rs": 29.604607867760535,
                "Rso": 30.363217389623426,
                "T": 35.71031305734456,
                "Tdew": 11.586127052058357,
                "Tn": 16.63123012541279,
                "Tx": 38.15816586386353,
                "U2": 2.109980962552553
            },
            "2016-07-13": {
                "ETo": 7.125977321136581,
                "Rnl": -6.655212969382696,
                "Rs": 28.953365419189822,
                "Rso": 29.71917977050784,
                "T": 31.518281813671354,
                "Tdew": 11.441155302463187,
                "Tn": 13.602904708774352,
                "Tx": 35.83075420979401,
                "U2": 1.9405713782602212
            },
            "2016-07-29": {
                "ETo": 7.4400206723353115,
                "Rnl": -6.422192656536355,
                "Rs": 27.092359851262678,
                "Rso": 28.51989494472884,
                "T": 35.18929394382025,
                "Tdew": 12.34168676909536,
                "Tn": 16.733386896280294,
                "Tx": 36.91181409507991,
                "U2": 2.2660049505318627
            },
            "2016-08-14": {
                "ETo": 7.1031215148605025,
                "Rnl": -6.825784059377582,
                "Rs": 25.956692589703263,
                "Rso": 26.75381875051429,
                "T": 33.77270513732425,
                "Tdew": 10.8870033492199,
                "Tn": 15.764374153495355,
                "Tx": 36.0166619676578,
                "U2": 2.301443681986007
            },
            "2016-08-30": {
                "ETo": 6.132973999882608,
                "Rnl": -6.494289103556645,
                "Rs": 24.149989135328592,
                "Rso": 24.60439517959016,
                "T": 30.83624204423956,
                "Tdew": 11.919599999636965,
                "Tn": 14.732188135911201,
                "Tx": 32.20810781665672,
                "U2": 2.6208305945014874
            },
            "2016-09-15": {
                "ETo": 4.570705726496718,
                "Rnl": -6.498685313554247,
                "Rs": 21.456379538043592,
                "Rso": 22.042362068013677,
                "T": 25.713270834317672,
                "Tdew": 10.110132066069411,
                "Tn": 10.811208139794573,
                "Tx": 29.804125389046202,
                "U2": 1.832352080845668
            }
        };
        return weather[ymd];
    }

    //ul_lr:=596898 4276385 656760 4162602
    function export_options() {
        return {
            crs: "EPSG:26910",
            crs_transform: [30, 0, 596898, 0, -30, 4276385],
            dimensions: '1995x3793',
            driveFolder: 'EarthEngine'
        };
    }

    return {
        delta_service_region: delta_service_region,
        landsat_crops: landsat_crops,
        landsat_hourly: landsat_hourly,
        export_options: export_options
    };
}()); //v2016-08-04a

var l_dates = ['2014-10-12', '2014-10-28', '2014-12-31',
    '2015-03-05', '2015-03-21', '2015-04-22', '2015-05-08', '2015-05-24',
//'2015-06-25',
    '2015-07-11', '2015-07-27', '2015-08-12', '2015-10-31',
    '2016-03-23', '2016-05-10', '2016-05-26', '2016-06-27',
    '2016-07-13', '2016-07-29', '2016-08-14', '2016-08-30',
    '2016-09-15', //'2016-10-01',
];

var date_objects = l_dates.map(function (d) {
    var ymd = d.split('-');
    return new Date(ymd[0], ymd[1] - 1, ymd[2], 0, 0, 0);
});

function get_fractions(start_date, end_date) {
    // OK, I haven't finished renaming everything below to make it clearer what's going on, but here's what I think this
    // code does (I didn't write it). I *think* that it handles making decisions about weighting the rasters for each landsat date to create
    // monthlies that align with each month of the year. For each of the input dates, it seems to determine relative distances
    function make_date_string(ymd) {
        // Make a hyphenated string from a JS date object
        var month = ymd.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        } else {
            month = "" + month;
        }
        var active_date = ymd.getDate();
        if (active_date < 10) {
            active_date = "0" + active_date;
        } else {
            active_date = "" + active_date;
        }
        return ymd.getFullYear() + "-" + month + "-" + active_date;
    }

    function get_frac(in_date) {
        var fraction = {date: make_date_string(in_date)}; // initialize the object
        if (in_date - date_objects[0] <= 0.0) { // if the provided date is before the first date object
            fraction[make_date_string(date_objects[0])] = 1; // then it should take the entire share of the time frame
        } else {
            for (var i = 0; i < date_objects.length - 1; i++) {
                if ((in_date - date_objects[i] > 0) && ((in_date - date_objects[i + 1]) <= 0)) {
                    // check if this date is after the current date object and before or on the next date object
                    // if so, break, and we'll use this date_object coming up.
                    break;
                }
            }
            if (i != (date_objects.length - 1)) { // if it's not the last object
                var distance = date_objects[i + 1] - date_objects[i];
                var distance_from_start = in_date - date_objects[i];
                fraction[make_date_string(date_objects[i])] = 1.0 - distance_from_start / distance;
                fraction[make_date_string(date_objects[i + 1])] = distance_from_start / distance;
            } else {
                fraction[make_date_string(date_objects[i])] = 1;
            }
        }
        return fraction;
    }

    var fractions = [];
    var start_date_parts = start_date.split('-');
    var end_date_parts = end_date.split('-').getInfo();  // if we don't use getInfo here, it doesn't calulate in time and it's undefined below and leads to problems.
    // I think we only have to run it on the end date because it's caluclated from the start date, so we need to force it to actually calculate
    var end_date_object = new Date(end_date_parts[0], end_date_parts[1] - 1, end_date_parts[2], 0, 0, 0);

    for (var i = 0; i < 365; i++) { // run for a year's worth of days, or until the end date is reached
        var new_date = new Date(start_date_parts[0], start_date_parts[1] - 1, start_date_parts[2], 0, 0, 0);
        new_date.setDate(new_date.getDate() + i);
        fractions.push(get_frac(new_date));
        if (end_date_object - new_date <= 0) // if we've passed the end date
            break;
    }

    fractions.pop();
    var multiplier_images = {};
    // This next section seems to transform from an object with an entry for each day that has subentries for each landsat image
    // to an object with entries for each landat image and subentries for each date that area a constant raster to use as a multiplier for that date
    for (i = 0; i < fractions.length; i++) {  // fractions will be a list of objects with dates of landsat images and the multiplier that corresponds to how to weight that image for the date being studied
        var fraction = fractions[i];  // get a single date
        var keys = Object.keys(fraction);  // get the images involved in this date
        for (var j = 0; j < keys.length; j++) {
            var key = keys[j];  // get a single date and its fraction
            if (typeof multiplier_images[key] === 'undefined') {
                multiplier_images[key] = [];  // add an empty list to multiplier_images corresponding to this date
            }
            multiplier_images[key].push(ee.Image(fraction[key]).set(  // create a constant raster for the multiplier of this date and landsat raster and set its properties
                {
                    'system:start_time': ee.Date(fraction.date).millis(),
                    'ymd': fraction.date,
                    'system:index': fraction.date
                }));
        }
    }
    delete multiplier_images.date;
    return multiplier_images;
}

var inner_join = ee.Join.inner();
var filter_time_eq = ee.Filter.equals({
    leftField: 'system:index',
    rightField: 'system:index'
});

// We need to convert the et_landsat collection to a kc_landsat collection
var const_eto = [];
l_dates.forEach(function (d) {
    const_eto.push(ee.Image(DELTA.landsat_hourly(d).ETo)
        .set({"system:index": d}));
});
var const_eto_c = ee.ImageCollection(const_eto);  // make an image collection out of the constant ETo rasters we just created
var inner_joined_landsat = inner_join.apply(et_landsat, const_eto_c, filter_time_eq);  // join the landsat and the constant ETo based on time
var kc_image_collection = inner_joined_landsat.map(function (feature) {
    var primary_feature = feature.get('primary');
    var secondary_feature = feature.get('secondary');
    var primary = ee.Image(primary_feature);
    var secondary = ee.Image(secondary_feature);  // we can embed a lot of these calls, but separating them to make it clearer what's going on
    return primary.divide(secondary).set({"ymd": primary.get("system:index")});
});

var band_month_2015 = {
    b1: '2014-10-01', b2: '2014-11-01', b3: '2014-12-01',
    b4: '2015-01-01', b5: '2015-02-01', b6: '2015-03-01',
    b7: '2015-04-01', b8: '2015-05-01', b9: '2015-06-01',
    b10: '2015-07-01', b11: '2015-08-01', b12: '2015-09-01',
};

var band_month_2016 = {
    b1: '2015-10-01', b2: '2015-11-01', b3: '2015-12-01',
    b4: '2016-01-01', b5: '2016-02-01', b6: '2016-03-01',
    b7: '2016-04-01', b8: '2016-05-01', b9: '2016-06-01',
    b10: '2016-07-01', b11: '2016-08-01', b12: '2016-09-01',
};

var band_month = band_month_2016;

var bands = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12'];

var monthlyET;


bands.forEach(function (b) { // this runs once for each month because each band is tied to a month we're working on
    var start_date_string = band_month[b]; // get the start date for this monthly band
    var start_date_object = ee.Date(start_date_string);  // make it into a JS object
    var end_date_object = start_date_object.advance(1, 'month');  // add 1 month to it to get the end date for searching
    var end_date_string = end_date_object.format('yyyy-MM-dd');  // get that as a string so we can use it elsewhere

    var days_in_month = end_date_object.difference(start_date_object, 'day');  // determine how many days there are between the end and the start
    var cimis_fractions = get_fractions(start_date_string, end_date_string);  // get an object with dates of the prior and next landsat images and the multiplier constant rasters for each day of the month.
    var cimis = cimis_et0.filterDate(start_date_string, end_date_string);  // get the CIMIS data for the date range we're looking at

    var landsat_multiplier = [];
    var landsat_dates = Object.keys(cimis_fractions);

    if(cimis.size() === 0){
        print("WARNING: No CIMIS rasters found for month starting " + start_date_string + ". Odd failures will likely follow");
    }

    landsat_dates.forEach(function (landsat_date) {
        var image_collection = ee.ImageCollection(cimis_fractions[landsat_date]); // make an image collection from the constant rasters for this landsat date
        var inner_joined_CIMIS = inner_join.apply(cimis, image_collection, filter_time_eq);
        /*if(inner_joined_CIMIS.features.getInfo().length === 0){
         print("WARNING: Size mismatch - CIMIS data failed to join correctly with landsat data for month starting " + start_date_string + " - odd failures likely follow.")
         }*/

        var multiplied_CIMIS = inner_joined_CIMIS.map(function (feature) {
            return ee.Image(feature.get('primary'))
                .multiply(ee.Image(feature.get('secondary')))
                .divide(days_in_month);
        });
        var total_CIMIS = ee.ImageCollection(multiplied_CIMIS).sum();
        landsat_multiplier.push(total_CIMIS.set({
            'system:time_start': ee.Date(landsat_date).millis(),
            'system:index': landsat_date
        }));
    });


    var filterTimeYMD = ee.Filter.equals({
        leftField: 'ymd',
        rightField: 'system:index'
    });
    var landsat_multiplier_c = ee.ImageCollection(landsat_multiplier);
    var inner_joined_ET = inner_join.apply(kc_image_collection, landsat_multiplier_c, filterTimeYMD);
    var multiplied_ET = inner_joined_ET.map(function (feature) {
        return ee.Image(feature.get('primary'))
            .multiply(ee.Image(feature.get('secondary')));
    });
    var totET = ee.ImageCollection(multiplied_ET).sum().toInt16();

    //Map.addLayer(landsat_multiplier_c);
    if (typeof monthlyET === 'undefined') {
        monthlyET = totET.select([0], [b]);
    } else {
        monthlyET = monthlyET.addBands(totET.select([0], [b]));
    }
});
print(monthlyET);
Map.addLayer(monthlyET, {bands: ['b1'], min: -10, max: 80}, 'monthlyET');
var opts = DELTA.export_options();

Export.image.toAsset({
    image: monthlyET,
    description: 'ucd_metric',
    /*
     assetId:'users/qjhart/ssj-delta-cu/ssj-ucd-metric/et_wy2015',
     pyramidingPolicy: {
     '.default': 'mean',
     },
     */
    scale: opts.scale,
    crs: opts.crs,
    crsTransform: opts.crs_transform,
    dimensions: opts.dimensions
});
