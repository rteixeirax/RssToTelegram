import rssMockData from './rssMockData';

export default {
  ...rssMockData,
  items: [
    ...rssMockData.items,
    {
      title: 'Issue with accessing the Clipboard following and "Ctrl+C"',
      link:
        'https://www.reddit.com/r/csharp/comments/lnjrwj/issue_with_accessing_the_clipboard_following_and/',
      pubDate: '2021-02-19T16:21:19.000Z',
      author: '/u/poelazycrafter',
      content:
        '<!-- SC_OFF --><div class="md"><p>Hi Everyone,</p> <p>&#x200B;</p> <p>I&#39;m currently creating a tool in C# WinForm for the game &quot;PathOfExile&quot; that would basically do the following:</p> <pre><code>On mouse down over an item if the item contain any desirable mod Suppress the mouse click </code></pre> <p>To do so, I created a small winform project using &quot;MouseKeyHook&quot; and &quot;WindowsInput&quot; in order to capture mouse/keyevent and send the ctrl+c. </p> <p>In PathOfExile, when you send a &quot;Ctrl+C&quot; while your cursor is on top of an item, all the item&#39;s properties are copied to the clipboard.</p> <p>&#x200B;</p> <p>I was hoping not having to multithread the tool since the process should work as follow:</p> <p>&#x200B;</p> <ol> <li>Mouse down</li> <li>send ctrl+c</li> <li>Copy the clipboard content</li> <li>Analyze the clipboard</li> <li>continue with the mouse events, or suppress the mouse down</li> </ol> <p>&#x200B;</p> <p>While doing the above, I have some trouble with the Clipboard where I get the following exception:</p> <pre><code>GetClipboardText ex System.Runtime.InteropServices.ExternalException (0x800401D0): Requested Clipboard operation did not succeed. at System.Windows.Forms.Clipboard.ThrowIfFailed(Int32 hr) at System.Windows.Forms.Clipboard.GetDataObject(Int32 retryTimes, Int32 retryDelay) at System.Windows.Forms.Clipboard.GetDataObject() at System.Windows.Forms.Clipboard.ContainsText(TextDataFormat format) at System.Windows.Forms.Clipboard.ContainsText() at LazyCrafter.Form1.GetClipboardText() in ... </code></pre> <p>My code looks as follow:</p> <p>&#x200B;</p> <pre><code> private void SendItemInfoQueryToPoe() { WindowsInput.InputSimulator iSim = new InputSimulator(); // Send the input iSim.Keyboard.ModifiedKeyStroke(VirtualKeyCode.CONTROL, VirtualKeyCode.VK_C); System.Threading.Thread.Sleep(100); string itemInfo = GetClipboardText(); Clipboard.Clear(); iSim = null; } private string GetClipboardText() { string strClipboard = &quot;Failed to get clipboard info&quot;; for (int i = 0; i &lt; 10; i++) { try { if (Clipboard.ContainsText()) { strClipboard = Clipboard.GetText(TextDataFormat.UnicodeText); Log(strClipboard); return strClipboard; } } catch (Exception ex) { Log(&quot;GetClipboardText ex \\r\\n&quot; + ex.ToString()); //fix for OpenClipboard Failed (Exception from HRESULT: 0x800401D0 (CLIPBRD_E_CANT_OPEN)) //https://stackoverflow.com/questions/12769264/openclipboard-failed-when-copy-pasting-data-from-wpf-datagrid //https://stackoverflow.com/questions/68666/clipbrd-e-cant-open-error-when-setting-the-clipboard-from-net System.Threading.Thread.Sleep(100); } } Log(&quot;Failed to get clipboard info after loop&quot;); return strClipboard; } </code></pre> <p>Anyone here had success working with the clipboard in C#?</p> </div><!-- SC_ON --> &#32; submitted by &#32; <a href="https://www.reddit.com/user/poelazycrafter"> /u/poelazycrafter </a> <br/> <span><a href="https://www.reddit.com/r/csharp/comments/lnjrwj/issue_with_accessing_the_clipboard_following_and/">[link]</a></span> &#32; <span><a href="https://www.reddit.com/r/csharp/comments/lnjrwj/issue_with_accessing_the_clipboard_following_and/">[comments]</a></span>',
      contentSnippet:
        'Hi Everyone,\n' +
        ' ​\n' +
        ` I'm currently creating a tool in C# WinForm for the game "PathOfExile" that would basically do the following:\n` +
        ' On mouse down over an item if the item contain any desirable mod Suppress the mouse click \n' +
        ' To do so, I created a small winform project using "MouseKeyHook" and "WindowsInput" in order to capture mouse/keyevent and send the ctrl+c. \n' +
        ` In PathOfExile, when you send a "Ctrl+C" while your cursor is on top of an item, all the item's properties are copied to the clipboard.\n` +
        ' ​\n' +
        ' I was hoping not having to multithread the tool since the process should work as follow:\n' +
        ' ​\n' +
        '  \n' +
        'Mouse down\n' +
        ' send ctrl+c\n' +
        ' Copy the clipboard content\n' +
        ' Analyze the clipboard\n' +
        ' continue with the mouse events, or suppress the mouse down\n' +
        '  \n' +
        '​\n' +
        ' While doing the above, I have some trouble with the Clipboard where I get the following exception:\n' +
        ' GetClipboardText ex System.Runtime.InteropServices.ExternalException (0x800401D0): Requested Clipboard operation did not succeed. at System.Windows.Forms.Clipboard.ThrowIfFailed(Int32 hr) at System.Windows.Forms.Clipboard.GetDataObject(Int32 retryTimes, Int32 retryDelay) at System.Windows.Forms.Clipboard.GetDataObject() at System.Windows.Forms.Clipboard.ContainsText(TextDataFormat format) at System.Windows.Forms.Clipboard.ContainsText() at LazyCrafter.Form1.GetClipboardText() in ... \n' +
        ' My code looks as follow:\n' +
        ' ​\n' +
        '  private void SendItemInfoQueryToPoe() { WindowsInput.InputSimulator iSim = new InputSimulator(); // Send the input iSim.Keyboard.ModifiedKeyStroke(VirtualKeyCode.CONTROL, VirtualKeyCode.VK_C); System.Threading.Thread.Sleep(100); string itemInfo = GetClipboardText(); Clipboard.Clear(); iSim = null; } private string GetClipboardText() { string strClipboard = "Failed to get clipboard info"; for (int i = 0; i < 10; i++) { try { if (Clipboard.ContainsText()) { strClipboard = Clipboard.GetText(TextDataFormat.UnicodeText); Log(strClipboard); return strClipboard; } } catch (Exception ex) { Log("GetClipboardText ex \\r\\n" + ex.ToString()); //fix for OpenClipboard Failed (Exception from HRESULT: 0x800401D0 (CLIPBRD_E_CANT_OPEN)) //https://stackoverflow.com/questions/12769264/openclipboard-failed-when-copy-pasting-data-from-wpf-datagrid //https://stackoverflow.com/questions/68666/clipbrd-e-cant-open-error-when-setting-the-clipboard-from-net System.Threading.Thread.Sleep(100); } } Log("Failed to get clipboard info after loop"); return strClipboard; } \n' +
        ' Anyone here had success working with the clipboard in C#?\n' +
        '    submitted by    /u/poelazycrafter  \n' +
        ' [link]   [comments]',
      id: 't3_lnjrwj',
      isoDate: '2021-02-19T16:21:19.000Z',
    },
  ],
};
