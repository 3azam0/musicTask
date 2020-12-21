import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {store, persistor} from './redux/store';
import AppContainer from './navigation';
import appTheme from './theme/custom-theme.json';
import {default as mapping} from './theme/custom-mapping.json';

// hash this in release
//global __DEV__

if (__DEV__) {
  import('./services/reactotronConfig').then(() => {});
}

const theme = {...eva.light, ...appTheme};

const App = () => (
  <SafeAreaProvider>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={theme} customMapping={mapping}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>

    </ApplicationProvider>
  </SafeAreaProvider>
);

export default App;
