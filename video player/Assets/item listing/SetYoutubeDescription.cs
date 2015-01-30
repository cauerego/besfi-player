using UnityEngine;
using System.Collections;

public class SetYoutubeDescription : MonoBehaviour
{
	private JSONObject jsonCached = new JSONObject();

	public void LoadYoutubeDescription ()
	{
		StartCoroutine("LoadIt");
	}

	private IEnumerator LoadIt ()
	{
		string text = "Loading . . .";
		UnityEngine.UI.Text compText = GetComponentInChildren<UnityEngine.UI.Text>();
		compText.text = text;
		
		WWW www = new WWW("http://gdata.youtube.com/feeds/api/videos/"+ gameObject.name +"?v=2&alt=json");
		while (!www.isDone) yield return null;
		
		if (www.error == null)
		{
			JSONObject jsonData = new JSONObject(www.text)["entry"]["media$group"];
			
			Debug.Log(www.url +"    "+ jsonData.ToString());
			if (jsonData.ToString() != jsonCached.ToString())
			{
				jsonCached = jsonData;
				
				/*url.Clear();
			for (var _this in jsonData.values)
			{
				url.Add(_this.toString());
			}*/
			}
			else // use cached json
			{
			}
			text = jsonCached["media$title"]["$t"].ToString().Replace("\"", "").Replace(" - ANIMATUNES", "")
				+"\n\n"+ jsonCached["media$description"]["$t"].ToString().Replace("\"", "");
		}
		else
		{
			//error.SetActive(true);
			text = "Error loading title! "+ www.error;
		}
		compText.text = text;
	}
}
