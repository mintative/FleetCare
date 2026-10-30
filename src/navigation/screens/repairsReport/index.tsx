import React from 'react';
import {WebView} from 'react-native-webview';
import { VehiclesStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<VehiclesStackParamList, "RepairsReport">

export const RepairReportScreen = ({navigation,route}: Props) => {

  const {vehicleId} = route.params;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #111827;
          }

          .card {
            padding: 16px;
            border-radius: 12px;
            background: #f3f4f6;
          }

          .cost {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
          }
        </style>
      </head>

      <body>
        <h1>Repair Report</h1>

        <div class="card">
          <h2>${vehicleId}</h2>
          <p>asdas}</p>
          <p class="cost">€dasd</p>
        </div>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{html}}
      style={{flex: 1}}
    />
  );
};