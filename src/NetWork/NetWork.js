function NetWork({onNetworkState}) {
    window.onoffline = () => {
      onNetworkState();
    };
    window.ononline = () => {
      onNetworkState();
    };
  }

  export default NetWork