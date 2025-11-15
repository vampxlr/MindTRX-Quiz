# 🔧 MINDTRX Troubleshooting Guide

Quick solutions to common issues you might encounter.

---

## 🚀 Starting the Application

### Issue: `npm run dev` fails

**Solution 1**: Make sure dependencies are installed
```bash
npm install
```

**Solution 2**: Delete node_modules and reinstall
```bash
rm -rf node_modules
npm install
```

**Solution 3**: Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

---

## 🎨 Visual Issues

### Issue: Three.js background not showing

**Possible Causes**:
1. **Browser doesn't support WebGL**
   - Solution: Use a modern browser (Chrome, Firefox, Edge, Safari)
   
2. **Hardware acceleration disabled**
   - Solution: Enable in browser settings
   
3. **Bright theme is active**
   - Solution: This is intentional! Switch to Dark theme to see animation

**Workaround**: The app works perfectly without Three.js background

### Issue: Animations are stuttering

**Solutions**:
1. Close other tabs/applications
2. Disable browser extensions
3. Switch to Bright theme (less GPU intensive)
4. Your system may have `prefers-reduced-motion` enabled (this is respected)

### Issue: Theme not persisting

**Solution**: Check if browser blocks localStorage
- Settings → Privacy → Allow local storage for localhost

---

## 📝 Quiz Issues

### Issue: Progress not saving

**Check**:
1. localStorage is enabled in browser
2. Not in incognito/private mode
3. Browser not blocking storage

**Test**: Open browser console and type:
```javascript
localStorage.setItem('test', 'works')
localStorage.getItem('test') // should return 'works'
```

### Issue: Can't submit quiz

**Causes**:
- Not all 27 questions answered
- JavaScript error (check console)

**Solution**: Use quick navigation grid to see which questions are unanswered

### Issue: Slider not working on mobile

**Solution**: Ensure touch events are enabled
- Should work on all modern mobile browsers
- Try refreshing the page

---

## 📊 Results Issues

### Issue: Results page shows "Loading..." forever

**Causes**:
1. Invalid result code
2. localStorage cleared
3. API not responding (if using server storage)

**Solutions**:
1. Verify the code is correct (8 characters)
2. Retake the quiz if code is lost
3. Check browser console for errors

### Issue: Quadrant chart not displaying

**Check**:
1. Canvas is supported (all modern browsers do)
2. No JavaScript errors in console
3. Proper result data exists

**Debug**: Open console and check for errors

### Issue: Play mode sliders don't move ghost dot

**Solution**: 
- This is animated in real-time
- Try moving sliders slowly
- Check if animations are enabled in your OS

---

## 📧 Email Issues

### Issue: Email not sending

**Remember**: In development, emails are just logged to console!

**For Production**:
1. Configure SMTP in `.env.local`
2. Uncomment email code in `app/api/send-email/route.ts`
3. Test with a real email service

**Check Console**: Look for "EMAIL WOULD BE SENT" message

### Issue: Email form doesn't accept my email

**Solution**: 
- Must be valid email format
- Check for typos
- Must have @ and domain

---

## 💾 Data & Storage Issues

### Issue: Lost my result code

**Solutions**:
1. Check browser history for the results URL
2. localStorage might still have it:
   ```javascript
   // In browser console:
   JSON.parse(localStorage.getItem('mindtrx_results'))
   ```
3. If all else fails, retake the quiz

### Issue: Want to clear all data

**Solution**:
```javascript
// In browser console:
localStorage.removeItem('mindtrx_current_quiz')
localStorage.removeItem('mindtrx_results')
localStorage.removeItem('mindtrx-theme')
```

Or just clear browser data for localhost.

---

## 🌐 Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

### Known Issues
- ⚠️ IE 11: Not supported (use modern browser)
- ⚠️ Very old browsers: May lack Canvas/WebGL support

---

## 📱 Mobile Issues

### Issue: Touch interactions not working

**Solutions**:
1. Update mobile browser
2. Clear cache
3. Try another browser (Chrome, Safari)

### Issue: Three.js slowing down mobile

**Solution**: Switch to Bright theme (disables 3D background)

### Issue: Text too small/large

**Check**: Zoom level in browser
- Reset: Pinch to zoom back to 100%
- Or use browser settings to reset zoom

---

## ⚙️ Development Issues

### Issue: TypeScript errors

**Solution**:
```bash
npm run build
```
This will show all type errors. Most should be auto-fixed.

### Issue: Linter errors

**Solution**:
```bash
npm run lint
```
Follow the suggestions to fix.

### Issue: Port 3000 already in use

**Solutions**:
1. Kill existing process:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:3000 | xargs kill
   ```

2. Use different port:
   ```bash
   PORT=3001 npm run dev
   ```

---

## 🔐 Privacy & Security

### Issue: Concerned about data privacy

**Reassurance**:
- Data stays in YOUR browser by default
- No tracking or analytics
- No cookies
- API storage is optional
- See `/privacy` page for full details

### Issue: Want to delete all my data

**Solution**: Clear localStorage (see "Data & Storage Issues" above)

---

## 🏗️ Build & Deploy Issues

### Issue: `npm run build` fails

**Check**:
1. All dependencies installed
2. TypeScript errors resolved
3. Environment variables set

**Solution**:
```bash
rm -rf .next
npm run build
```

### Issue: Deployed but not working

**Check**:
1. Environment variables set on host
2. Build completed successfully
3. API routes working
4. Check deployment logs

---

## 🆘 Emergency Reset

If everything is broken, nuclear option:

```bash
# Delete everything and start fresh
rm -rf node_modules
rm -rf .next
rm package-lock.json

# Reinstall
npm install
npm run dev
```

---

## 📞 Getting Help

### Before Asking for Help

1. **Check browser console** for errors (F12)
2. **Try in incognito mode** (rules out extensions)
3. **Try different browser**
4. **Clear cache and reload**

### What to Include

When reporting issues:
- Browser name and version
- Operating system
- Error messages from console
- Steps to reproduce
- Screenshots if relevant

---

## 💡 Pro Tips

1. **Keep your browser updated** for best experience
2. **Use Dark theme** for full visual experience
3. **Take quiz on desktop** first time for best UX
4. **Save your result code** somewhere safe
5. **Try both themes** to see the difference

---

## ✅ Quick Health Check

Run this in your browser console on any page:

```javascript
// Check if app is working
console.log('React:', typeof React !== 'undefined' ? '✅' : '❌')
console.log('localStorage:', typeof localStorage !== 'undefined' ? '✅' : '❌')
console.log('Canvas:', document.createElement('canvas').getContext ? '✅' : '❌')
console.log('WebGL:', document.createElement('canvas').getContext('webgl') ? '✅' : '❌')
```

All should show ✅ for full functionality.

---

## 🎯 Common Questions

**Q: Can I take the quiz multiple times?**
A: Yes! Click "Take Quiz Again" on results page.

**Q: Can I change my answers?**
A: Yes, use the quick navigation to go back to any question.

**Q: Do I need an account?**
A: No! Everything works without signup.

**Q: Is my data shared?**
A: No, it stays in your browser unless you explicitly share your result code.

**Q: Can I print my results?**
A: Yes, use browser print function (Ctrl+P / Cmd+P) on results page.

---

## 🔄 Still Having Issues?

1. Try the Emergency Reset above
2. Check if the issue happens in multiple browsers
3. Verify you're using a supported browser version
4. Check the PROJECT_SUMMARY.md for system requirements

---

**Remember**: MINDTRX is built with modern web standards and should work flawlessly on any up-to-date browser! 🚀

Most issues are browser-specific and can be resolved by clearing cache or updating the browser.

