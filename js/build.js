(function () {
  if (Fliplet.Env.get('interact')) {
    return; // do not track in edit mode  
  }

  $('[data-analytics-id]').each(function () {
    var data = Fliplet.Widget.getData($(this).attr('data-analytics-id'));

    if (data.trackUser === false) {
      Fliplet.App.Analytics.disableUserTracking();
    }

    var pageTitle = Fliplet.Env.get('pageTitle');
    if (Fliplet.App.isPreview(true)) {
      pageTitle += ' (Preview)';
    }

    // Wait until app hooks have been fired to avoid tracking the page view
    // when a security hook redirects the user to a different screen
    Fliplet.Hooks.on('beforePageViewHooksSuccess', function () {
      // Screen data capture
      Fliplet.App.Analytics.pageView({
        screen: pageTitle
      });
    });
    
    // Intercepts events
    Fliplet.Analytics.subscribe('trackEvent', function (event) {
      Fliplet.App.Analytics.event({
        category: event.category,
        action: event.action,
        label: event.label,
        screen: pageTitle
      });
    });
  });
})();
