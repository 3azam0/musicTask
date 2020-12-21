import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Modal,
  Spinner as UISpinner,
} from '@ui-kitten/components';

export const Spinner = ({visible}) => {
  const styles = useStyleSheet(themedStyles);

  const renderModalElement = () => (
    <Layout level="3" style={styles.container}>
      <UISpinner status="info" />
    </Layout>
  );

  return (
    <Modal backdropStyle={styles.backdrop} visible={visible}>
      {renderModalElement()}
    </Modal>
  );
};

const themedStyles = StyleService.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  backdrop: {
    backgroundColor: 'color-basic-transparent-600',
  },
});

Spinner.propTypes = {
  visible: PropTypes.bool.isRequired,
};
