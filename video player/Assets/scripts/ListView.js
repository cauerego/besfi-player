#pragma strict
import System.Collections.Generic;

var parent : GameObject;
var prefab : GameObject;
var items = new List.<GameObject>();

function Start ()
{
	Refresh();
}

function Update () {

}

function Refresh ()
{
	for (var item in items)
	{
		GameObject.Destroy(item);
	}
	items.Clear();
	
	var y = -60;
	for (var url in VideoPlaylist.url)
	{
		var newFromPrefab = GameObject.Instantiate(prefab) as GameObject;
		var rectTransform = newFromPrefab.GetComponent(RectTransform) as RectTransform;
		
		var position = Vector3(0, y, 0);
		rectTransform.anchorMin = Vector2(0.5, 1);
		rectTransform.anchorMax = Vector2(0.5, 1);
		rectTransform.pivot = Vector2(0, 0);
		newFromPrefab.transform.localPosition = position;
		
		newFromPrefab.transform.FindChild("rename-me").gameObject.name = url;
		newFromPrefab.transform.SetParent(parent.transform.parent, false);
		
		// ugly dependency, from prefab hierarchy
		var playButton = newFromPrefab.transform.GetChild(0).GetComponent("PlayYoutube") as PlayYoutube;
		if (playButton != null) playButton.parent = parent;
		
		items.Add(newFromPrefab);
		y -= 120;
	}
}