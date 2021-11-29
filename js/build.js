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

    // Wait until app hooks have been fired to avoid tracking the page view
    // when a security hook redirects the user to a different screen
    Fliplet.Hooks.on('beforePageViewHooksSuccess', function () {
      // Screen data capture
      Fliplet.App.Analytics.pageView(pageTitle);
    });

    // Intercepts events
    Fliplet.Analytics.subscribe('trackEvent', function (event, options) {
      Fliplet.App.Analytics.event(event, options);
    });
  });
})();
