<h3>Creating the Slope Map</h3>
<p>Once you download QGIS and the data here is a quick run through of how to create the map, with links to additional resources.</p>
<p>The terrain 50 data is published as a set of zip files, one for each 10km x 10km grid square in GB.</p>                        
            <ul>
            <li>The easiest way to use the data is to create a 'virtual mosaic' with GDAL Raster following <a href="http://www.landscape-laboratory.org/2013/06/19/getting-started-with-os-terrain-50-elevation-data/">instructions from the Landscape Laboratory blog</a>. This will automatically unzip and stitch together all the different tiles.</li>
            <li>Once you have the VRT you can add the raster grid to QGIS, then with the built in tool <a href="https://docs.qgis.org/2.2/en/docs/training_manual/rasters/terrain_analysis.html#moderate-fa-calculating-the-slope">Calculate the Slope</a>.  This will create a new file that you can save which by default will give a slope value in degrees.</li>
            <li>For this map I used the <a href="https://docs.qgis.org/2.2/en/docs/user_manual/working_with_raster/raster_calculator.html">raster calculator</a> to create a mask that removes all slope values less than 27.5&deg;:
                </li>
                                <div class="panel" style="background-color:#f5f5f5;">(gb_slope_map@1 >= 27.5) * gb_slope_map@1</div>
                </ul>
                
The map tiles themselves were created using <a href="http://www.esri.com/software/arcgis/arcgis-for-desktop">ESRI ArcGIS Desktop</a> (not free, but available for home use at £100/year), however there are a number of free tools that could be used for this task;        
            <ul><li>Geoserver with <a href="http://geowebcache.org/">Geowebcache</a></li>
            <li>QGIS with <a href="https://plugins.qgis.org/plugins/qtiles/">QTiles</a></li>
            <li><a href="https://www.mapbox.com/tilemill/">Tilemill</a></li>
            <li><a href="http://tilestache.org/">Tilestache</a></li>
            </ul>

