const CracoLessPlugin = require('craco-less');
const path = require('path');
const fs = require('fs');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              //
              // @primary-color: #1890ff; // primary color for all components
              // @link-color: #1890ff; // link color
              // @success-color: #52c41a; // success state color
              // @warning-color: #faad14; // warning state color
              // @error-color: #f5222d; // error state color
              //
              'primary-color': '#5470FF',
              // 'success-color': '#D9D9D9',
              'info-color': '#67BCFA',
              'danger-color': '#FF2500',
              'black-color': '#000000',
              'white-color': '#ffffff',
              'border-radius-base': '6px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
