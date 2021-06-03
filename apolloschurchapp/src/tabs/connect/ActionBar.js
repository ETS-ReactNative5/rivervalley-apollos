import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const Toolbar = () => (
  <RockAuthedWebBrowser>
    {(openUrl) => (
      <ActionBar>
        <ActionBarItem
          onPress={() => openUrl('https://www.rivervalley.org/locations/')}
          icon="locate"
          label="Find a location"
        />
        <ActionBarItem
          onPress={() => openUrl('https://www.rivervalley.org/give/')}
          icon="download"
          label="Give"
        />
      </ActionBar>
    )}
  </RockAuthedWebBrowser>
);

export default Toolbar;
