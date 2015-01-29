#pragma strict
//import System.Collections.Generic;

var button : UI.Button;
private var animators : Animator[];
private var m_youtubeURL : String;
private var m_youtubeDel : IYoutubeDelegate;
private var tex : Texture2D;
//private var jsonCached : json = json.fromString('[]'); // not working
private var jsonCached : JSONObject; // also not working

#if UNITY_EDITOR or UNITY_STANDALONE or UNITY_WEBPLAYER
function OnMouseUpAsButton () { OnPointerUpAsButton(); }
#endif
function OnPointerUpAsButton ()
{
	for (var animator in animators)
	{
		switch (Random.Range(0, 3)) {
			case 0: animator.SetTrigger("spin y"); break;
			case 1: animator.SetTrigger("spin z"); break;
			case 2: animator.SetTrigger("spin x"); break;
		}
		while (!animator.GetCurrentAnimatorStateInfo(0).IsName("idle")) yield; // not working!
	}
	IYoutubeBinding.PlayVideo(m_youtubeURL, "medium");
}

function Start ()
{
	button = GetComponent.<UI.Button>();
	button.onClick.RemoveAllListeners();
	button.onClick.AddListener(function() {
		Debug.Log(""); // doesn't work with this line, for w/e reason! O_o
		OnPointerUpAsButton();
	});
	
	//m_youtubeDel.MPMoviePlaybackStateCallback += YoutubeCallback;
	
	m_youtubeURL = Settings.Instance.videoBaseUrl + gameObject.name;
	
	animators = GetComponentsInChildren.<Animator>();
	
	SendMessage("LoadYoutubeDescription");
	
	LoadYoutubeImageUrl();
	
	StartCoroutine("LoadImageUrl");
}

function notworking_LoadYoutubeDescription ()
{
	var text = "Loading . . .";
	var compText = GetComponentInChildren.<UI.Text>() as UI.Text;
	compText.text = text;
	
	var www : WWW = new WWW("http://gdata.youtube.com/feeds/api/videos/"+ gameObject.name +"?v=2&alt=json");
	yield www;
	
	if (www.error == null)
	{
//		var jsonData : json = json.fromString(www.text)._get("entry")._get("media$group");
		var jsonData : JSONObject = new JSONObject();//www.text)["entry"]["media$group"];
		
Debug.Log(www.url);// +"    "+ jsonData.stringify());
//		if (jsonData.stringify() != jsonCached.stringify())
		{
			jsonCached = jsonData;
			
			/*url.Clear();
			for (var _this in jsonData.values)
			{
				url.Add(_this.toString());
			}*/
		}
//		else // use cached json
		{
		}
		text = jsonCached["media$title"]["$t"].ToString();
//		text = jsonCached._get("media$title")._get("$t").toString();
//			+"\n"+ jsonCached._get("media$description")._get("$t").toString();
	}
	else
	{
		//error.SetActive(true);
		text = "Error loading title! "+ www.error;
	}
	compText.text = text;
}

function LoadYoutubeImageUrl ()
{
	var imageBytes : byte[];
	
	imageBytes = IYoutubeBinding.GetYoutubeThumbnailQuick(m_youtubeURL, "medium");
	imageSource = new WWW("http://img.youtube.com/vi/"+ gameObject.name +"/default.jpg");
#if UNITY_EDITOR
var texAss = Resources.Load("test") as TextAsset;
imageBytes = texAss.bytes;
#endif
	if (imageBytes != null) // something below is not working!
	{
		tex = new Texture2D(1, 1);
		tex.LoadImage(imageBytes);
		tex.Apply();
		
//		Debug.Log(String.Format("{0} = {1}", renderer.material.mainTexture.name, tex.name));
//		renderer.material.mainTexture = tex;
	}
}

var imageSource : WWW;
function LoadImageUrl ()
{
	while (!imageSource.isDone) yield;
	
	tex = new Texture2D(1, 1);
	
	if (String.IsNullOrEmpty(imageSource.error))
	{
		imageSource.LoadImageIntoTexture(tex);
		
		for (var rend : Renderer in GetComponentsInChildren.<Renderer>())
		{
			rend.material.mainTexture = tex;
		}
	}
	else
	{
		Debug.LogError("[be-sFi player] Couldn't LoadImageUrl ("+ imageSource.url +"): " + imageSource.error);
	}
}

/// IMPORTANT : Please drag the IYoutube prefab to your scene for receive delegate.
function YoutubeCallback (state : IYoutubeDelegate.MPMoviePlaybackState)
{
	switch(state)
	{
		case IYoutubeDelegate.MPMoviePlaybackState.MPMoviePlaybackStatePlaying:
			Debug.Log("Playing youtube");
		break;
		case IYoutubeDelegate.MPMoviePlaybackState.MPMoviePlaybackStateFinish:
			Debug.Log("Finish youtube");
		break;
	}
}
