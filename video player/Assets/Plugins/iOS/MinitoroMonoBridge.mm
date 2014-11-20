//
//  MinitoroMonoBridge.c
//  ystreamxcode
//
//  Created by liccowee on 7/1/13.
//  Copyright (c) 2013 liccowee. All rights reserved.
//

#import "IYoutube.h"

extern "C"
{
    char* MakeStringCopy (const char* string) {
        if (string == NULL) return NULL;
        char* res = (char*)malloc(strlen(string) + 1);
        strcpy(res, string);
        return res;
    }
    
    /// quality => hd720, medium, small
    bool _playVideo(char* url, char* quality)
    {
        IYoutube *youtube = [[IYoutube alloc] init];
        bool isPlay = [youtube playYoutubeVideoWithURL:[NSURL URLWithString:[NSString stringWithUTF8String:url]] quality:[NSString stringWithUTF8String:quality]];
        
        if(!isPlay)
            NSLog(@"_playVideo failed.");
        
        return isPlay;
    }
    
    /// thumbnail size => default, medium, high and max
    const char* _getYoutubeThumbnailURLByURL(char* url, char* size)
    {
        IYoutube *youtube = [[IYoutube alloc] init];
        NSURL *thumbnailURL = [youtube getYoutubeVideoThumbnailURLWithURL:[NSURL URLWithString:[NSString stringWithUTF8String:url]] thumbnailSize:[NSString stringWithUTF8String:size]];
        
        return MakeStringCopy([[thumbnailURL absoluteString] UTF8String]);
    }
    
    
    
    /// thumbnail size => default, medium, high and max
    const char* _getYoutubeThumbnailByURL(char* url, char* size)
    {
        IYoutube *youtube = [[IYoutube alloc] init];
        
        [youtube getYoutubeVideoThumbnailWithURL:[NSURL URLWithString:[NSString stringWithUTF8String:url]] thumbnailSize:[NSString stringWithUTF8String:size] completeBlock:^(UIImage *image, NSError *error) {
            
            NSLog(@"Youtube thumbnail image : %@", image);
        }];
        return 0;
    }
    
    /// thumbnail size => default, medium, high and max
    const char* _getYoutubeThumbnailQuick(char* url, char* size)
    {
        IYoutube *youtube = [[IYoutube alloc] init];
        UIImage* image = [youtube getYoutubeVideoThumbnailQuick:[NSURL URLWithString:[NSString stringWithUTF8String:url]] thumbnailSize:[NSString stringWithUTF8String:size]];
        
        NSData *imageData = UIImagePNGRepresentation(image);
        NSArray* paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString *documentsDirectory = [paths objectAtIndex:0];
        NSString *filePath = [documentsDirectory stringByAppendingPathComponent:@"YoutubeThumbnail.jpg"];
        
        NSLog(@"Path %@", filePath);
        NSLog(@"Xcode Image Data %@", imageData);
        [imageData writeToFile:filePath atomically:YES];
        return MakeStringCopy([filePath UTF8String]);
    }
}
