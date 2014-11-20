using UnityEngine;
using System.Collections;

/// <summary>
/// IYoutube Delegate MUST together with the IYoutube prefab. Please make sure the IYoutube prefab exist at the scene, so the callback will be function.
/// </summary>
public class IYoutubeDelegate : MonoBehaviour 
{
	public enum MPMoviePlaybackState
	{
		MPMoviePlaybackStateFinish,
		MPMoviePlaybackStateStopped,
		MPMoviePlaybackStatePlaying,
		MPMoviePlaybackStatePaused,
		MPMoviePlaybackStateInterrupted,
		MPMoviePlaybackStateSeekingBackward,
		MPMoviePlaybackStateSeekingForward
	}
	
	public System.Action<MPMoviePlaybackState>		MPMoviePlaybackStateCallback;


	void OnIYoutubeCallback(string msg)
	{
		//Debug.Log(string.Format("OnIYoutubeCallback [{0}]", msg));
		switch(msg)
		{
			case "MPMoviePlaybackStateFinish":
				if(MPMoviePlaybackStateCallback != null)
					MPMoviePlaybackStateCallback(MPMoviePlaybackState.MPMoviePlaybackStateFinish);
			break;
			case "MPMoviePlaybackStateStopped":
				if(MPMoviePlaybackStateCallback != null)
					MPMoviePlaybackStateCallback(MPMoviePlaybackState.MPMoviePlaybackStateStopped);
			break;
			case "MPMoviePlaybackStatePlaying":
				if(MPMoviePlaybackStateCallback != null)
					MPMoviePlaybackStateCallback(MPMoviePlaybackState.MPMoviePlaybackStatePlaying);
			break;
			case "MPMoviePlaybackStatePaused":
				if(MPMoviePlaybackStateCallback != null)
					MPMoviePlaybackStateCallback(MPMoviePlaybackState.MPMoviePlaybackStatePaused);
			break;
			case "MPMoviePlaybackStateInterrupted":
				if(MPMoviePlaybackStateCallback != null)
					MPMoviePlaybackStateCallback(MPMoviePlaybackState.MPMoviePlaybackStateInterrupted);
			break;
			case "MPMoviePlaybackStateSeekingBackward":
				if(MPMoviePlaybackStateCallback != null)
					MPMoviePlaybackStateCallback(MPMoviePlaybackState.MPMoviePlaybackStateSeekingBackward);
			break;
			case "MPMoviePlaybackStateSeekingForward":
				if(MPMoviePlaybackStateCallback != null)
					MPMoviePlaybackStateCallback(MPMoviePlaybackState.MPMoviePlaybackStateSeekingForward);
			break;
		}
	}
}
