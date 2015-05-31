// Define the osMap variable

var osMap, markersfile;

// This function creates the map and is called by the div in the HTML

function initMap()

  {
    
// Create new map
    
    osMap = new OpenSpace.Map('map');
    
// Set map centre in National Grid Eastings and Northings and select zoom level 7

      osMap.setCenter(new OpenSpace.MapPoint(235524, 818521), 1);
// Define where the markers file is
    
    var markersFile = "TSKC_Weekend_Trips.csv";
    
// Load the markers file
    
    OpenLayers.loadURL(markersFile, null, this, parseFile, onFail);
            
  }

// This function parses through the text file to create the markers

function parseFile(result)

  {
      
      var size = new OpenLayers.Size(33, 45);
      var offset = new OpenLayers.Pixel(-16, -37);
      var infoWindowAnchor = new OpenLayers.Pixel(16, 16);
      var greyIcon = new OpenSpace.Icon('http://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_1.1/OS/images/markers/marker-target-sml-silver.png', new OpenLayers.Size(20,27), new OpenLayers.Pixel(-10,-15), null, infoWindowAnchor);
      var blueIcon = new OpenSpace.Icon('http://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_1.1/OS/images/markers/marker_blue.png', size, offset, null, infoWindowAnchor);

    var text = result.responseText;
    
// Split the file by line

    var lines = text.split('\n');

/* Cycle through each line and split it by comma into columns then if there are exactly 3 resulting columns, pass the first one to the x variable, the second to the y variable. Create the marker position from these then add the popup text from the last column. Finally create the marker */
    
    for (var i = 1; i < lines.length; i++)

    {
      
      var columns = lines[ i ].split(',');
      if (columns.length == 8)        
        {
            var icon = blueIcon;
            if (columns[ 0 ] !== "" && columns[ 0 ] !== "TBC")
            {
                // Parse as date, choose icon size.
                var tripStartArray = columns[0].split('/');
                var tripStartDate = new Date( parseInt(tripStartArray[2]),  parseInt(tripStartArray[1])-1,parseInt(tripStartArray[0]));
                if (tripStartDate < Date.now())
                {
                 icon = greyIcon;   
                }
            }
            
          var x = parseFloat(columns[ 6 ]);
          var y = parseFloat(columns[ 7 ]);
          var pos = new OpenSpace.MapPoint(x, y);
          var popupText = "<h4><a href='" + columns[4] + "'>" + columns[ 2 ] + "</a></h4>";
            popupText += columns[0]+ "<br/>Grade " + columns[3] ;

          osMap.createMarker(pos, icon.clone(), popupText);
          
         }
      }
    }


// This function creates an alert if the markers file fails to load
                     
function onFail(e)

  {
      console.log("Cannot load markers file");
      console.log(e);
  }