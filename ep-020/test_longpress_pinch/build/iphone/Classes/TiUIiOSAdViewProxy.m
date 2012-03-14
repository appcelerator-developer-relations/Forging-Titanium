/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2010 by test_longpress_pinch, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#import "TiBase.h"
#import "TiUIiOSAdViewProxy.h"
#import "TiUtils.h"

#ifdef USE_TI_UIIOSADVIEW

#import <iAd/iAd.h>

@implementation TiUIiOSAdViewProxy

-(NSString*)SIZE_320x50 
{
	if ([TiUtils isIOS4_2OrGreater]) {
		return ADBannerContentSizeIdentifierPortrait;
	}
	return @"ADBannerContentSize320x50";
}

-(NSString*)SIZE_480x32 
{
	if ([TiUtils isIOS4_2OrGreater]) {
		return ADBannerContentSizeIdentifierLandscape;
	}
	return @"ADBannerContentSize480x32";
}

USE_VIEW_FOR_AUTO_HEIGHT
USE_VIEW_FOR_AUTO_WIDTH

-(void)cancelAction:(id)args
{
	[[self view] performSelectorOnMainThread:@selector(cancelAction:) withObject:args waitUntilDone:NO];
}

@end

#endif