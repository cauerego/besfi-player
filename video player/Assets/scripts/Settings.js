#pragma strict

// based on http://wiki.unity3d.com/index.php/Toolbox

class Settings extends Singleton.<Settings>
{
	protected function Settings () {} // guarantee this will be always a singleton only - can't use the constructor!
	
	var videoBaseUrl = "http://www.youtube.com/watch?v=";
	var videoListUrl = "https://www.dropbox.com/s/3hzmj699h5p3b23/video%20list.txt?dl=1";
	var playlistRefreshInterval = 20; // seconds

	function Awake () {
		var settings : Settings = Settings.Instance;
	}
}