#pragma strict

static var url = new Array();

function Start ()
{
	var urlBase = "http://www.youtube.com/watch?v=";
	
	uQuery.Get("https://www.dropbox.com/s/3hzmj699h5p3b23/video%20list.txt?dl=1", function(data, xhr : uQueryXHR)
	{
		var jsonArray : json = json.fromString(data);
		
		for (var _this in jsonArray.values)
		{
			url.Add(_this.toString());
		}
		
		BroadcastMessage("Refresh", SendMessageOptions.DontRequireReceiver);
	});
}

function Update ()
{
	
}