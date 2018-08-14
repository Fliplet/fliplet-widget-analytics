(function () {
  if (Fliplet.Env.get('interact')) {
    return; // do not track in edit mode  
  }
    
  // Wait until app hooks have been fired to avoid tracking the page view
  // when a security hook redirects the user to a different screen
  Fliplet.Hooks.on('beforePageViewHooksSuccess', function () {
    // Screen data capture  
    Fliplet.App.Analytics.pageView({
      screen: Fliplet.Env.get('pageTitle')
    });
  });
  
  // Intercepts events
  Fliplet.Analytics.subscribe('trackEvent', function (event) {
    Fliplet.App.Analytics.event({
      category: event.category,
      action: event.action,
      label: event.label,
      screen: Fliplet.Env.get('pageTitle')
    });
  });
})();
