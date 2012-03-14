/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2011 by test_longpress_pinch, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#import <Foundation/Foundation.h>
#import "TiProxy.h"
#import "TiBlob.h"

// TODO: Support array-style access of bytes
@interface TiBuffer : TiProxy {
    NSMutableData* data;
    NSNumber* byteOrder;
}
@property(nonatomic, retain) NSMutableData* data;

// Public API
-(NSNumber*)append:(id)args;
-(NSNumber*)insert:(id)args;
-(NSNumber*)copy:(id)args;
-(TiBuffer*)clone:(id)args;
-(void)fill:(id)args;

-(void)clear:(id)_void;
-(void)release:(id)_void;

-(TiBlob*)toBlob:(id)_void;
-(NSString*)toString:(id)_void;

@property(nonatomic,assign) NSNumber* length;
@property(nonatomic,retain) NSNumber* byteOrder;
// SPECIAL NOTES:
// Ti.Buffer objects have an 'overloaded' Ti.Buffer[x] operation for x==int (making them behave like arrays).
// See the code for how this works.

@end
