import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, registerBreadcrumbs } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { createDashboardLink } from './createDashboardLink';
import { dashboardMeta } from './dashboard.meta';

declare var __VERSION__: string;
// __VERSION__ is replaced by Webpack with the version from package.json
const version = __VERSION__;

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const backendDependencies = {
  'webservices.rest': '^2.2.0',
};

function setupOpenMRS() {
  const moduleName = '@ugandaemr/esm-patient-queues-app';

  const options = {
    featureName: 'patient queues',
    moduleName,
  };

  registerBreadcrumbs([]);

  defineConfigSchema(moduleName, configSchema);

  return {
    pages: [
      {
        load: getAsyncLifecycle(
          () => import('./queue-patient-linelists/scheduled-appointments-table.component'),
          options,
        ),
        route: /^appointments-list/,
        online: true,
        offline: true,
      },
      {
        load: getAsyncLifecycle(() => import('./queue-patient-linelists/queue-services-table.component'), options),
        route: /^patient-queues/,
        online: true,
        offline: true,
      },
    ],
    extensions: [
      {
        id: 'outpatient-side-nav-ext',
        slot: 'outpatient-sidebar-slot',
        load: getAsyncLifecycle(() => import('./side-menu/side-menu.component'), options),
        online: true,
        offline: true,
      },
      {
        id: 'patient-queues-dashboard-link',
        slot: 'homepage-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(dashboardMeta), options),
        meta: dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'home-dashboard',
        slot: 'patient-queues-dashboard-slot',
        load: getAsyncLifecycle(() => import('./home.component'), options),
        online: true,
        offline: true,
      },
      {
        id: 'edit-queue-entry-status-modal',
        load: getAsyncLifecycle(() => import('./active-visits/change-status-dialog.component'), {
          featureName: 'edit queue status',
          moduleName,
        }),
      },
      {
        id: 'patient-info-banner-slot',
        load: getAsyncLifecycle(() => import('./patient-info/patient-info.component'), {
          featureName: 'patient info slot',
          moduleName,
        }),
      },
      {
        id: 'add-patient-to-queue',
        slot: 'add-patient-to-queue-slot',
        load: getAsyncLifecycle(() => import('./patient-search/visit-form/visit-form.component'), {
          featureName: 'patient info slot',
          moduleName,
        }),
      },
      {
        id: 'remove-queue-entry',
        load: getAsyncLifecycle(() => import('./remove-queue-entry-dialog/remove-queue-entry.component'), {
          featureName: 'remove queue entry and end visit',
          moduleName,
        }),
      },
      {
        id: 'clear-all-queue-entries',
        load: getAsyncLifecycle(() => import('./clear-queue-entries-dialog/clear-queue-entries-dialog.component'), {
          featureName: 'clear all queue entries and end visits',
          moduleName,
        }),
      },
      {
        id: 'add-visit-to-queue-modal',
        load: getAsyncLifecycle(() => import('./add-patient-toqueue/add-patient-toqueue-dialog.component'), {
          featureName: 'add visit to queue',
          moduleName,
        }),
      },
      {
        id: 'transition-queue-entry-status-modal',
        load: getAsyncLifecycle(() => import('./transition-queue-entry/transition-queue-entry-dialog.component'), {
          featureName: 'transition queue status',
          moduleName,
        }),
      },
      {
        id: 'previous-visit-summary-widget',
        slot: 'previous-visit-summary-slot',
        load: getAsyncLifecycle(() => import('./past-visit/past-visit.component'), options),
      },
      {
        id: 'add-provider-to-room-modal',
        load: getAsyncLifecycle(() => import('./add-provider-queue-room/add-provider-queue-room.component'), {
          featureName: 'add provider queue room',
          moduleName,
        }),
      },
      {
        id: 'add-queue-entry-widget',
        slot: 'add-queue-entry-slot',
        load: getAsyncLifecycle(
          () => import('./patient-search/visit-form-queue-fields/visit-form-queue-fields.component'),
          options,
        ),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS, version };
