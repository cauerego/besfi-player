#pragma strict
import System.Collections.Generic;

var loading : GameObject;
var error : GameObject;
private var settings : Settings;
private var lastRefreshed : float;
static var url = new List.<String>();
static var jsonUrl : json = json.fromString('[]');

function Start ()
{
	settings = Settings.Instance;
	
	lastRefreshed = Time.time;
	
	var www : WWW = new WWW(settings.videoListUrl);
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
		error.SetActive(true);
		Debug.LogWarning("[mvplayer] WWW Error: "+ www.error);
	}
	GameObject.Destroy(loading);
}

function Update ()
{
	if (settings.playlistRefreshInterval > 0 && Time.time > lastRefreshed + settings.playlistRefreshInterval)
	{
		Start();
	}
}