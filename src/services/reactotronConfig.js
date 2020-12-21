import {NativeModules} from 'react-native';
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  asyncStorage,
  networking,
} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


let scriptHostname;
/* global __DEV__ */
if (__DEV__) {
  const {scriptURL} = NativeModules.SourceCode;

  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

const reactotronConfig = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    enabled: true,
    host: scriptHostname, // server ip
    port: 9090,
  })
  .useReactNative()
  .use(reactotronRedux())
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(asyncStorage())
  .use(networking())
  .connect();

console.tron = Reactotron;
Reactotron.clear();

// export const sagaMonitor = Reactotron.createSagaMonitor();

export default reactotronConfig;
