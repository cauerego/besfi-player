#pragma strict

var parent : GameObject;
var prefab : GameObject;
var item = new Array();

function Start ()
{
	Refresh();
}

function Update () {

}

function Refresh ()
{
	var y = -60;
	for (var url in Playlist.url)
	{
		var position = Vector3(0, y, 0);
		var newFromPrefab = GameObject.Instantiate(prefab) as GameObject;
		var rectTransform = newFromPrefab.GetComponent(RectTransform) as RectTransform;
		rectTransform.anchorMin = Vector2(0.5, 1);
		rectTransform.anchorMax = Vector2(0.5, 1);
		rectTransform.pivot = Vector2(0, 0);
		newFromPrefab.transform.localPosition = position;
		newFromPrefab.transform.FindChild("rename-me").gameObject.name = url;
		newFromPrefab.transform.SetParent(parent.transform.parent, false);
		item.Add(newFromPrefab);
		y -= 120;
	}
}