/***
 * Copyrighted by minitoro, 7/7/2013
 */

using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;
using System.IO;

public class IYoutubeBinding
{
#if UNITY_ANDROID
	protected static AndroidJavaObject m_pluginObject = null;
	
	protected static AndroidJavaObject PluginObject
	{
		get
		{
			if(m_pluginObject == null)
			{
				m_pluginObject = new AndroidJavaObject("com.minitoro.iyoutube.YoutubePlugin");
			}
			return m_pluginObject;
		}
	}
#elif UNITY_IOS
	[DllImport ("__Internal")]
	private static extern bool _playVideo(string url, string quality);
	
	[DllImport ("__Internal")]
	private static extern string _getYoutubeThumbnailURLByURL(string url, string size);
	
	[DllImport ("__Internal")]
	private static extern string _getYoutubeThumbnailQuick(string url, string size);
#endif
	
	/// <summary>
	/// Play the youtube video.
	/// </summary>
	/// <returns>
	/// Return true if the video play successful.
	/// </returns>
	/// <param name="url">youtube url, example http://www.youtube.com/watch?v=yCKSxEgz2XI </param>
	/// <param name="quality">few quality available for youtube video, such as (hd720, medium, small). Pass in the correct string for quality
	/// you need to play </param>
	public static bool PlayVideo(string url, string quality)
	{
		//Debug.Log("PlayVideo " + url);
		bool isPlay = false;
#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android)
		{
			PluginObject.Call("PlayVideo", url, quality);
			isPlay = true;
		}
#elif UNITY_IOS
		if( Application.platform == RuntimePlatform.IPhonePlayer )
		{
			isPlay = _playVideo(url, quality);
		}
#endif
		return isPlay;
	}
	
	
	/// <summary>
	/// Gets the youtube thumbnail URL by youtube video url. This allow you to load the thumbnail texture by using unity WWW.
	/// </summary>
	/// <returns>
	/// Return for the youtube thumbnial url.
	/// </returns>
	/// <param name='url'>youtube url, example http://www.youtube.com/watch?v=yCKSxEgz2XI
	/// </param>
	/// <param name='size'>
	/// Size of the thumbnail > (default, medium, high and max), 4 selection for the thumbnail size.
	/// </param>
	public static string GetYoutubeThumbnailURLByURL(string url, string size)
	{
		//Debug.Log("GetYoutubeThumbnailURLByURL "+ url);
		string thumbnailURL = "";
#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android)
		{
			thumbnailURL = PluginObject.Call<string>("GetYoutubeThumbnailURLByURL", url, size);
		}
#elif UNITY_IOS
		if( Application.platform == RuntimePlatform.IPhonePlayer )
		{
			thumbnailURL = _getYoutubeThumbnailURLByURL(url, size);
		}
#endif
		return thumbnailURL;
	}

	
	/// <summary>
	/// Gets the youtube thumbnail image by byte data.
	/// </summary>
	/// <returns>
	/// Return for the thumbnail image data.
	/// </returns>
	/// <param name='url'>youtube url, example http://www.youtube.com/watch?v=yCKSxEgz2XI
	/// </param>
	/// <param name='size'>
	/// Size of the thumbnail > (default, medium, high and max), 4 selection for the thumbnail size.
	/// </param>
	public static byte[] GetYoutubeThumbnailQuick(string url, string size)
	{
		//Debug.Log("GetYoutubeThumbnailQuick "+ url);
		byte[] imageBytes = null;
#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android)
		{
			string imagePath = PluginObject.Call<string>("GetYoutubeThumbnailQuick", url, size);
			if(imagePath == null)
				return null;
			
			imageBytes = File.ReadAllBytes(imagePath);
		}
#elif UNITY_IOS
		if( Application.platform == RuntimePlatform.IPhonePlayer )
		{
			string imagePath = _getYoutubeThumbnailQuick(url, size);
			if(imagePath == "")
				return null;
	        
			imageBytes = File.ReadAllBytes(imagePath);
		}
#endif

        return imageBytes;
	}
	
	public static void SetAutoCloseOnComplete(bool v)
	{
		//Debug.Log("SetAutoCloseOnComplete > " + v);
#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android)
		{
			PluginObject.Call("SetAutoCloseOnComplete", (v)?"true":"false");
		}
#elif UNITY_IOS
		if(Application.platform == RuntimePlatform.IPhonePlayer)
		{
			Debug.LogWarning("SetAutoCloseOnComplete does not support at iphone");
		}
#endif
	}
}
