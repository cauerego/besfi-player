#pragma strict

var we = 2;

var cam : Camera;
var online : Material;
var onlineColor : Color;
var onlineBg : GameObject;
var offline : Material;
var offlineColor : Color;
var offlineBg : GameObject;

private var animator : Animator;

#if UNITY_EDITOR or UNITY_STANDALONE or UNITY_WEBPLAYER
function OnMouseUpAsButton () { OnPointerUpAsButton(); }
#endif
function OnPointerUpAsButton ()
{
	if (animator.GetCurrentAnimatorStateInfo(0).IsName("stopped"))
	{
		animator.SetTrigger("button away");
		onlineBg.SetActive(false);
		offlineBg.SetActive(false);
		if (renderer.sharedMaterial.name == online.name)
		{
			renderer.sharedMaterial = offline;
			cam.backgroundColor = offlineColor;
			offlineBg.SetActive(true);
#if UNITY_EDITOR
Screen.orientation = ScreenOrientation.Landscape;
#endif
		}
		else
		{
			renderer.sharedMaterial = online;
			cam.backgroundColor = onlineColor;
			onlineBg.SetActive(true);
#if UNITY_EDITOR
Screen.orientation = ScreenOrientation.Portrait;
#endif
		}
		animator.SetTrigger("button back");
	}
}

function Awake ()
{
	//cam = Camera.main;
	renderer.material = online;
	cam.backgroundColor = onlineColor;
	animator = GetComponent("Animator");
}