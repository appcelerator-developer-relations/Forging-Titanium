package test.videoplayer;

import org.appcelerator.titanium.ITiAppInfo;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiProperties;
import org.appcelerator.kroll.common.Log;

/* GENERATED CODE
 * Warning - this class was generated from your application's tiapp.xml
 * Any changes you make here will be overwritten
 */
public final class Test_videoplayerAppInfo implements ITiAppInfo
{
	private static final String LCAT = "AppInfo";
	
	public Test_videoplayerAppInfo(TiApplication app) {
		TiProperties properties = app.getSystemProperties();
					
					properties.setBool("ti.android.fastdev", false);
					
					properties.setString("ti.android.runtime", "v8");
					
					properties.setString("ti.deploytype", "development");
	}
	
	public String getId() {
		return "test.videoplayer";
	}
	
	public String getName() {
		return "test_videoplayer";
	}
	
	public String getVersion() {
		return "1.0";
	}
	
	public String getPublisher() {
		return "tlukasavage";
	}
	
	public String getUrl() {
		return "http://appcelerator.com";
	}
	
	public String getCopyright() {
		return "2011 by tlukasavage";
	}
	
	public String getDescription() {
		return "not specified";
	}
	
	public String getIcon() {
		return "appicon.png";
	}
	
	public boolean isAnalyticsEnabled() {
		return true;
	}
	
	public String getGUID() {
		return "b936b8c5-d788-4e18-afd5-a788d140a513";
	}
	
	public boolean isFullscreen() {
		return false;
	}
	
	public boolean isNavBarHidden() {
		return false;
	}
}
