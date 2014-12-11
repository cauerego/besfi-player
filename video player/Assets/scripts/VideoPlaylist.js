#pragma strict
import System.Collections.Generic;

var videoListUrl = "https://www.dropbox.com/s/3hzmj699h5p3b23/video%20list.txt?dl=1";
var refreshInterval : int; // in seconds
private var lastRefreshed : float;
static var url = new List.<String>();
static var jsonUrl : json = json.fromString('[]');

function Start ()
{
	lastRefreshed = Time.time;
	
	var www : WWW = new WWW(videoListUrl);
	yield www;
	
	if (www.error == null)
	{
		var jsonData : json = json.fromString(www.text);
		
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
	}
	else
	{
		Debug.LogWarning("[mvplayer] WWW Error: "+ www.error);
	}
}

function Update ()
{
	if (refreshInterval > 0 && Time.time > lastRefreshed + refreshInterval)
	{
		Start();
	}
}