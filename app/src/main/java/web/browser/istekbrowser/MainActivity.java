package web.browser.istekbrowser;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.media.AudioManager;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.GridLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {
    private static final int FILE_CHOOSER_REQUEST_CODE = 1001;
    private ValueCallback<Uri[]> filePathCallback;
    private WebView webView;
    private FrameLayout rootLayout;
    private FrameLayout appDrawer;
    private AudioManager audioManager;
    private final ExecutorService geminiExecutor = Executors.newSingleThreadExecutor();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        audioManager = (AudioManager) getSystemService(AUDIO_SERVICE);
        rootLayout = new FrameLayout(this);
        webView = new WebView(this);
        rootLayout.addView(webView, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(rootLayout);
        configureWebView();
        addHomeControls();
        addChannelControls();
        buildAppDrawer();
        webView.loadUrl("file:///android_asset/www/index.html");
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if ("file".equals(uri.getScheme()) || "https".equals(uri.getScheme()) || "http".equals(uri.getScheme())) {
                    return false;
                }
                startActivity(new Intent(Intent.ACTION_VIEW, uri));
                return true;
            }
        });

        webView.addJavascriptInterface(new GeminiBridge(), "IstekGemini");

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                if (MainActivity.this.filePathCallback != null) {
                    MainActivity.this.filePathCallback.onReceiveValue(null);
                }
                MainActivity.this.filePathCallback = filePathCallback;
                Intent intent = fileChooserParams.createIntent();
                try {
                    startActivityForResult(intent, FILE_CHOOSER_REQUEST_CODE);
                } catch (Exception exception) {
                    MainActivity.this.filePathCallback = null;
                    return false;
                }
                return true;
            }
        });
    }

    private void addHomeControls() {
        LinearLayout controls = new LinearLayout(this);
        controls.setOrientation(LinearLayout.VERTICAL);
        controls.setGravity(Gravity.CENTER);
        controls.setPadding(dp(8), dp(8), dp(8), dp(8));
        controls.setBackground(makePanelBackground());

        Button volumeUp = makeControlButton("+");
        volumeUp.setContentDescription("Volume up");
        volumeUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                adjustVolume(AudioManager.ADJUST_RAISE);
            }
        });

        Button volumeDown = makeControlButton("−");
        volumeDown.setContentDescription("Volume down");
        volumeDown.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                adjustVolume(AudioManager.ADJUST_LOWER);
            }
        });

        Button apps = makeControlButton("Apps");
        apps.setTextSize(14);
        apps.setContentDescription("Show all apps");
        apps.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showAppDrawer();
            }
        });

        controls.addView(volumeUp, controlButtonParams());
        controls.addView(volumeDown, controlButtonParams());
        controls.addView(apps, controlButtonParams());

        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(dp(92), ViewGroup.LayoutParams.WRAP_CONTENT);
        params.gravity = Gravity.END | Gravity.CENTER_VERTICAL;
        params.setMargins(0, 0, dp(16), 0);
        rootLayout.addView(controls, params);
    }

    private void addChannelControls() {
        LinearLayout controls = new LinearLayout(this);
        controls.setOrientation(LinearLayout.VERTICAL);
        controls.setGravity(Gravity.CENTER);
        controls.setPadding(dp(8), dp(8), dp(8), dp(8));
        controls.setBackground(makePanelBackground());

        Button previous = makeControlButton("‹");
        previous.setContentDescription("Go back");
        previous.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                webView.goBack();
            }
        });

        Button next = makeControlButton("›");
        next.setContentDescription("Go forward");
        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                webView.goForward();
            }
        });

        Button fullScreen = makeControlButton("AI");
        fullScreen.setTextSize(13);
        fullScreen.setContentDescription("Open İstek AI page");
        fullScreen.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                callWebControl("goToIstekAi");
            }
        });

        controls.addView(previous, controlButtonParams());
        controls.addView(next, controlButtonParams());
        controls.addView(fullScreen, controlButtonParams());

        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(dp(92), ViewGroup.LayoutParams.WRAP_CONTENT);
        params.gravity = Gravity.START | Gravity.CENTER_VERTICAL;
        params.setMargins(dp(16), 0, 0, 0);
        rootLayout.addView(controls, params);
    }

    private void callWebControl(String controlName) {
        if (webView == null) return;
        webView.evaluateJavascript("window.istekBrowser && window.istekBrowser." + controlName + " && window.istekBrowser." + controlName + "();", null);
    }

    private class GeminiBridge {
        @JavascriptInterface
        public void ask(final String question) {
            geminiExecutor.execute(new Runnable() {
                @Override
                public void run() {
                    sendGeminiAnswer(generateGeminiAnswer(question));
                }
            });
        }
    }

    private String generateGeminiAnswer(String question) {
        String apiKey = BuildConfig.GEMINI_API_KEY;
        if (apiKey == null || apiKey.trim().isEmpty()) {
            return "Gemini API key is not configured. Add GEMINI_API_KEY as a Gradle property or environment variable in the APK build.";
        }

        HttpURLConnection connection = null;
        try {
            URL url = new URL("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + Uri.encode(apiKey));
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setConnectTimeout(20000);
            connection.setReadTimeout(30000);
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

            JSONObject textPart = new JSONObject().put("text", question);
            JSONObject content = new JSONObject().put("parts", new JSONArray().put(textPart));
            JSONObject body = new JSONObject().put("contents", new JSONArray().put(content));
            byte[] payload = body.toString().getBytes(StandardCharsets.UTF_8);
            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(payload);
            outputStream.close();

            InputStream responseStream = connection.getResponseCode() >= 400 ? connection.getErrorStream() : connection.getInputStream();
            String responseBody = readStream(responseStream);
            if (connection.getResponseCode() >= 400) {
                return "Gemini error: " + responseBody;
            }

            JSONObject response = new JSONObject(responseBody);
            JSONArray candidates = response.optJSONArray("candidates");
            if (candidates == null || candidates.length() == 0) return "Gemini returned no answer.";
            JSONObject firstCandidate = candidates.getJSONObject(0);
            JSONArray parts = firstCandidate.getJSONObject("content").optJSONArray("parts");
            if (parts == null || parts.length() == 0) return "Gemini returned no text.";
            return parts.getJSONObject(0).optString("text", "Gemini returned an empty answer.");
        } catch (Exception exception) {
            return "Gemini request failed: " + exception.getMessage();
        } finally {
            if (connection != null) connection.disconnect();
        }
    }

    private String readStream(InputStream inputStream) throws Exception {
        if (inputStream == null) return "";
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        StringBuilder builder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            builder.append(line);
        }
        reader.close();
        return builder.toString();
    }

    private void sendGeminiAnswer(final String answer) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (webView == null) return;
                webView.evaluateJavascript("window.receiveGeminiAnswer && window.receiveGeminiAnswer(" + JSONObject.quote(answer) + ");", null);
            }
        });
    }

    private void adjustVolume(int direction) {
        if (audioManager == null) return;
        audioManager.adjustStreamVolume(AudioManager.STREAM_MUSIC, direction, AudioManager.FLAG_SHOW_UI);
    }

    private Button makeControlButton(String label) {
        Button button = new Button(this);
        button.setText(label);
        button.setTextColor(Color.WHITE);
        button.setTextSize(24);
        button.setTypeface(Typeface.DEFAULT_BOLD);
        button.setAllCaps(false);
        button.setBackground(makeButtonBackground());
        return button;
    }

    private LinearLayout.LayoutParams controlButtonParams() {
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(58));
        params.setMargins(0, dp(5), 0, dp(5));
        return params;
    }

    private void buildAppDrawer() {
        appDrawer = new FrameLayout(this);
        appDrawer.setVisibility(View.GONE);
        appDrawer.setBackgroundColor(0xF206111F);

        LinearLayout panel = new LinearLayout(this);
        panel.setOrientation(LinearLayout.VERTICAL);
        panel.setPadding(dp(18), dp(18), dp(18), dp(18));

        LinearLayout header = new LinearLayout(this);
        header.setGravity(Gravity.CENTER_VERTICAL);
        header.setOrientation(LinearLayout.HORIZONTAL);

        TextView title = new TextView(this);
        title.setText("All apps");
        title.setTextColor(Color.WHITE);
        title.setTextSize(26);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        header.addView(title, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));

        ImageButton close = new ImageButton(this);
        close.setContentDescription("Close apps");
        close.setImageResource(android.R.drawable.ic_menu_close_clear_cancel);
        close.setBackground(makeButtonBackground());
        close.setColorFilter(Color.WHITE);
        close.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                hideAppDrawer();
            }
        });
        header.addView(close, new LinearLayout.LayoutParams(dp(52), dp(52)));
        panel.addView(header);

        ScrollView scrollView = new ScrollView(this);
        GridLayout appGrid = new GridLayout(this);
        appGrid.setColumnCount(4);
        appGrid.setPadding(0, dp(12), 0, dp(28));
        populateApps(appGrid);
        scrollView.addView(appGrid);
        panel.addView(scrollView, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1));

        appDrawer.addView(panel, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        rootLayout.addView(appDrawer, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    }

    private void populateApps(GridLayout appGrid) {
        PackageManager packageManager = getPackageManager();
        Intent launcherIntent = new Intent(Intent.ACTION_MAIN, null);
        launcherIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        List<ResolveInfo> apps = new ArrayList<>(packageManager.queryIntentActivities(launcherIntent, 0));
        Collections.sort(apps, new Comparator<ResolveInfo>() {
            @Override
            public int compare(ResolveInfo first, ResolveInfo second) {
                return first.loadLabel(packageManager).toString().compareToIgnoreCase(second.loadLabel(packageManager).toString());
            }
        });

        for (final ResolveInfo app : apps) {
            appGrid.addView(makeAppTile(packageManager, app));
        }
    }

    private View makeAppTile(final PackageManager packageManager, final ResolveInfo app) {
        LinearLayout tile = new LinearLayout(this);
        tile.setOrientation(LinearLayout.VERTICAL);
        tile.setGravity(Gravity.CENTER);
        tile.setPadding(dp(8), dp(10), dp(8), dp(10));
        tile.setBackground(makeTileBackground());
        tile.setClickable(true);
        tile.setFocusable(true);

        ImageView icon = new ImageView(this);
        icon.setImageDrawable(app.loadIcon(packageManager));
        icon.setAdjustViewBounds(true);
        tile.addView(icon, new LinearLayout.LayoutParams(dp(58), dp(58)));

        TextView label = new TextView(this);
        label.setText(app.loadLabel(packageManager));
        label.setTextColor(Color.WHITE);
        label.setTextSize(12);
        label.setGravity(Gravity.CENTER);
        label.setMaxLines(2);
        tile.addView(label, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        tile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                launchApp(app);
            }
        });

        GridLayout.LayoutParams params = new GridLayout.LayoutParams();
        params.width = dp(118);
        params.height = dp(128);
        params.setMargins(dp(6), dp(6), dp(6), dp(6));
        tile.setLayoutParams(params);
        return tile;
    }

    private void launchApp(ResolveInfo app) {
        ComponentName componentName = new ComponentName(app.activityInfo.packageName, app.activityInfo.name);
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        intent.setComponent(componentName);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        try {
            hideAppDrawer();
            startActivity(intent);
        } catch (Exception exception) {
            Toast.makeText(this, "Could not open app", Toast.LENGTH_SHORT).show();
        }
    }

    private void showAppDrawer() {
        appDrawer.setVisibility(View.VISIBLE);
        appDrawer.bringToFront();
    }

    private void hideAppDrawer() {
        appDrawer.setVisibility(View.GONE);
    }

    private GradientDrawable makePanelBackground() {
        GradientDrawable drawable = new GradientDrawable();
        drawable.setColor(0x660D1F39);
        drawable.setCornerRadius(dp(24));
        drawable.setStroke(dp(1), 0x66FFFFFF);
        return drawable;
    }

    private GradientDrawable makeButtonBackground() {
        GradientDrawable drawable = new GradientDrawable(GradientDrawable.Orientation.LEFT_RIGHT, new int[]{0x99EF1D2F, 0x660A5BA8});
        drawable.setCornerRadius(dp(18));
        return drawable;
    }

    private GradientDrawable makeTileBackground() {
        GradientDrawable drawable = new GradientDrawable();
        drawable.setColor(0x1AFFFFFF);
        drawable.setCornerRadius(dp(20));
        drawable.setStroke(dp(1), 0x26FFFFFF);
        return drawable;
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != FILE_CHOOSER_REQUEST_CODE || filePathCallback == null) {
            return;
        }
        Uri[] results = WebChromeClient.FileChooserParams.parseResult(resultCode, data);
        filePathCallback.onReceiveValue(results);
        filePathCallback = null;
    }

    @Override
    public void onBackPressed() {
        if (appDrawer != null && appDrawer.getVisibility() == View.VISIBLE) {
            hideAppDrawer();
            return;
        }
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            geminiExecutor.shutdownNow();
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}
