import querystring from 'querystring';
import React from 'react';
import ApollosConfig from '@apollosproject/config';
import { Providers, NavigationService } from '@apollosproject/ui-kit';
import { AuthProvider } from '@apollosproject/ui-auth';
import { AnalyticsProvider } from '@apollosproject/ui-analytics';
import { NotificationsProvider } from '@apollosproject/ui-notifications';
import {
  LiveProvider,
  ACCEPT_FOLLOW_REQUEST,
} from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';
import RNAmplitude from 'react-native-amplitude-analytics';
import { ONBOARDING_VERSION } from './ui/Onboarding';

import ClientProvider, { client } from './client';
import customTheme, { customIcons } from './theme';

const amplitude = new RNAmplitude(ApollosConfig.AMPLITUDE_API_KEY);

const AppProviders = (props) => (
  <ClientProvider {...props}>
    <NotificationsProvider
      oneSignalKey={ApollosConfig.ONE_SIGNAL_KEY}
      // TODO deprecated prop
      navigate={NavigationService.navigate}
      handleExternalLink={(url) => {
        const path = url.includes('app-link/')
          ? url.split('app-link/')[1]
          : url.split('//')[1];

        const [route, location] = path.split('/');
        if (route === 'content')
          NavigationService.navigate('ContentSingle', { itemId: location });
        if (route === 'nav') {
          const [cleanPath, query] = location.split('?');
          const args = querystring.parse(query);
          NavigationService.navigate(
            // turns "home" into "Home"
            cleanPath[0].toUpperCase() + cleanPath.substring(1),
            args
          );
        }
      }}
      actionMap={{
        // accept a follow request when someone taps "accept" in a follow request push notification
        acceptFollowRequest: ({ requestPersonId }) =>
          client.mutate({
            mutation: ACCEPT_FOLLOW_REQUEST,
            variables: { personId: requestPersonId },
          }),
      }}
    >
      <AuthProvider
        navigateToAuth={() => NavigationService.navigate('Auth')}
        navigate={NavigationService.navigate}
        closeAuth={() =>
          checkOnboardingStatusAndNavigate({
            client,
            navigation: NavigationService,
            latestOnboardingVersion: ONBOARDING_VERSION,
          })
        }
      >
        <AnalyticsProvider
          trackFunctions={[
            ({ eventName, properties }) =>
              amplitude.logEvent(eventName, properties),
          ]}
        >
          <LiveProvider>
            <Providers
              // TODO fix dark mode, lots of black on black
              themeInput={{ ...customTheme, type: 'light' }}
              iconInput={customIcons}
              {...props}
            />
          </LiveProvider>
        </AnalyticsProvider>
      </AuthProvider>
    </NotificationsProvider>
  </ClientProvider>
);

export default AppProviders;
