(function () {
  // Screen data capture  
  Fliplet.App.Analytics.pageView({
    screen: Fliplet.Env.get('pageTitle')
  });
  
  // Intercepts events
  Fliplet.Analytics.subscribe('trackEvent', function (event) {
    Fliplet.App.Analytics.event({
      category: event.category,
      action: event.action,
      label: event.label,
      screen: Fliplet.Env.get('pageTitle') + ' / ' + event.action + ' / ' + event.label
    });
  });
})();
