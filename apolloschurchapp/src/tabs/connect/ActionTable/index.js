import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  TableView,
  Cell,
  CellIcon,
  CellText,
  Divider,
  Touchable,
  styled,
  PaddedView,
  H4,
} from '@apollosproject/ui-kit';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit,
}))(PaddedView);

const Name = styled({
  flexGrow: 1,
})(View);

const ActionTable = () => {
  const navigation = useNavigation();
  return (
    <RockAuthedWebBrowser>
      {(openUrl) => (
        <View>
          <RowHeader>
            <Name>
              <H4>{'Connect with River Valley'}</H4>
            </Name>
          </RowHeader>
          <TableView>
            <Touchable
              onPress={() => openUrl('https://www.rivervalley.org/give/')}
            >
              <Cell>
                <CellText>Donate</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() =>
                openUrl('https://www.rivervalley.org/next-steps/serve/')
              }
            >
              <Cell>
                <CellText>Find a serving opportunity</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() =>
                openUrl('https://www.rivervalley.org/smallgroups/')
              }
            >
              <Cell>
                <CellText>Join a small group</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
          </TableView>
        </View>
      )}
    </RockAuthedWebBrowser>
  );
};

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
