//
//  MPViewController.h
//  ystreamxcode
//
//  Created by liccowee on 11/11/13.
//  Copyright (c) 2013 liccowee. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MediaPlayer/MediaPlayer.h>

@interface MPViewController : UIViewController
{
    MPMoviePlayerViewController *mp;
}
-(void)initWithContentURL:(NSURL*)url;
@end
