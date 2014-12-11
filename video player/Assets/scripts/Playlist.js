#pragma strict

var refreshInterval : int; // in seconds
private var lastRefreshed : float;
static var url = new Array();
static var jsonUrl : json = json.fromString('[]');

function Start ()
{
	lastRefreshed = Time.time;
	
	var urlBase = "http://www.youtube.com/watch?v=";
	
	uQuery.Get("https://www.dropbox.com/s/3hzmj699h5p3b23/video%20list.txt?dl=1", function(data, xhr : uQueryXHR)
	{
		var jsonData : json = json.fromString(data);
		
		if (jsonData.stringify() != jsonUrl.stringify())
		{
			jsonUrl = jsonData;
			
			url.Clear();
			for (var _this in jsonData.values)
			{
				url.Add(_this.toString());
			}
			
			Debug.Log( "[mvPlayer] "+ lastRefreshed +" refreshing playlist with: " + jsonData.stringify() );
			BroadcastMessage("Refresh", SendMessageOptions.DontRequireReceiver);
		}
		else
		{
			Debug.Log( "[mvPlayer] "+ lastRefreshed +" refreshing playlist. Stays the same" );
		}
	});
}

function Update ()
{
	if (refreshInterval > 0 && Time.time > lastRefreshed + refreshInterval)
	{
		Start();
	}
}