//
//  IYoutube.h
//  ystream
//
//  Created by liccowee on 6/30/13.
//  Copyright (c) 2013 liccowee. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MPViewController.h"

@interface IYoutube : NSObject

/// quality => hd720, medium, small
-(bool)playYoutubeVideoWithURL: (NSURL*) strURL quality: (NSString*) quality;

/// thumbnail size => default, medium, high and max
-(NSURL*)getYoutubeVideoThumbnailURLWithURL: (NSURL*) strURL thumbnailSize:(NSString*)thumbnailSize;

-(void)getYoutubeVideoThumbnailWithURL: (NSURL*) strURL thumbnailSize:(NSString*)thumbnailSize completeBlock:(void(^)(UIImage *image, NSError *error))completeBlock;

-(UIImage*)getYoutubeVideoThumbnailQuick: (NSURL*) strURL thumbnailSize:(NSString*) thumbnailSize;
@end


