import React from 'react';
import { StyleSheet, View } from 'react-native';
import { styled } from '@apollosproject/ui-kit';

import { Landing } from '@apollosproject/ui-onboarding';

const Background = styled(({ theme }) => ({
  resizeMode: 'cover',
  ...StyleSheet.absoluteFill,
  width: '100%',
  height: '100%',
  backgroundColor: theme.colors.tertiary,
}))(View);

const LandingScreenSlide = ({ navigation }) => (
  <Landing
    onPressPrimary={() => navigation.push('Auth')}
    BackgroundComponent={<Background source={require('./img/landing.jpg')} />}
    primaryNavText={"Let's go!"}
  />
);

export default LandingScreenSlide;
