import React, { useMemo } from 'react';
import { WebView } from 'react-native-webview';
import { VehiclesStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { maintenanceStore, vehicleStore } from '../../../stores';

import { colors } from '../../../theme/colors';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<VehiclesStackParamList, 'RepairsReport'>;

export const RepairReportScreen = ({ route }: Props) => {
  const { vehicleId } = route.params;
  const {t} = useTranslation();
  const vehicle = vehicleStore.getVehicleById(vehicleId);
  const repairs = maintenanceStore.getVehicleRepairs(vehicleId);
  const filterTabs = useMemo(() => [
      { title: t('maintenance.filters.all'), tab: 'all' as const },
      { title: t('maintenance.filters.planned'), tab: 'planned' as const },
      { title: t('maintenance.filters.in_progress'), tab: 'in_progress' as const },
      { title: t('maintenance.filters.completed'), tab: 'completed' as const },
    ], [t]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return colors.redDark;
      case 'high':
        return colors.orangeDark;
      case 'medium':
        return colors.blueDark;
      default:
        return colors.greenDark;
    }
  };

  const getBadgeClass = (status: string) => {
    if (status === 'completed') return 'badge-success';
    if (status === 'in_progress') return 'badge-warning';
    return 'badge-plain';
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {

            padding: 16px;
            background-color: #f9fafb;
            color: #111827;
          }

          .report-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
          }

          .container {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
          }

          .header .title {
            font-size: 18px;
            font-weight: 700;
            color: #111827;
          }

          .row {
            margin-top: 4px;
          }

          .plate-number {
            display: inline-block;
            font-size: 13px;
            font-weight: 600;
            color: #4b5563;
            background-color: #f3f4f6;
            padding: 2px 8px;
            border-radius: 4px;
            text-transform: uppercase;
          }


          .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            text-transform: capitalize;
            margin-top: 2px;
          }

          .badge-success {
            background-color: #dcfce7;
            color: #15803d;
          }

          .badge-warning {
            background-color: #fef3c7;
            color: #b45309;
          }

          .badge-plain {
            background-color: #f3f4f6;
            color: #4b5563;
          }


          .info {
            margin-bottom: 16px;
          }

          .repair-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
            color: #1f2937;
          }

          .repair-description {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.4;
          }


          .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #f3f4f6;
            padding-top: 12px;
          }

          .priority {
            font-size: 14px;
            font-weight: 600;
          }

          .date {
            font-size: 13px;
            color: #9ca3af;
          }
        </style>
      </head>

      <body>
        <h1 class="report-title">Repair Report</h1>

        ${
          repairs && repairs.length > 0
            ? repairs
                .map((item) => {
                  const date = item.date
                    ? new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                      })
                    : '';

                  const statusTitle =
                    filterTabs.find((t) => t.tab === item.status)?.title || item.status;
                  const priorityColor = getPriorityColor(item.priority);
                  const badgeClass = getBadgeClass(item.status);
                  const priorityText =
                    item.priority.charAt(0).toUpperCase() + item.priority.slice(1);

                  return `
            <div class="container">
              <div class="top">
                <div class="content">
                  <div class="header">
                    <div class="title">
                      ${vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Unknown Vehicle'}
                    </div>
                  </div>

                  ${
                    vehicle?.plateNumber
                      ? `
                    <div class="row">
                      <span class="plate-number">${vehicle.plateNumber}</span>
                    </div>
                  `
                      : ''
                  }
                </div>

                <span class="badge ${badgeClass}">${statusTitle}</span>
              </div>

              <div class="info">
                <div class="repair-title">${item.title}</div>
                <div class="repair-description">${item.description || ''}</div>
              </div>

              <div class="bottom">
                <span class="priority" style="color: ${priorityColor}">${priorityText}</span>
                <span class="date">${date}</span>
              </div>
            </div>
          `;
                })
                .join('')
            : '<p style="color: #6b7280;">No repair records found.</p>'
        }
      </body>
    </html>
  `;

  return <WebView originWhitelist={['*']} source={{ html }} style={{ flex: 1 }} />;
};