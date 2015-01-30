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
	
	var y = -80;
	for (var url in VideoPlaylist.url)
	{
		var newFromPrefab = GameObject.Instantiate(prefab) as GameObject;
		
		newFromPrefab.transform.SetParent(parent.transform, false);
		
		newFromPrefab.transform.localPosition = Vector3(0, y, 0);
		
		newFromPrefab.name = url;
		
		items.Add(newFromPrefab);
		y -= 150;
	}
	
	parent.GetComponent.<RectTransform>().sizeDelta = new Vector2(0, Mathf.Abs(y));
}