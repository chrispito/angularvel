import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import { createSelector } from '@ngrx/store';

export const getRouterAppReducer = createSelector(
  fromFeature.getWebAdminState,
  fromRoot.getRouterState,
  (state, router) => router
);

export * from './user.selector';
export * from './page.selector';
