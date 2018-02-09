import { Action } from '@ngrx/store';
import { About } from '../../models/about_page.model';

/**
 * Load AboutPage
 */
export const LOAD_ABOUT_PAGE = '[Application] Load About Page';
export const LOAD_ABOUT_PAGE_FAIL = '[Application] Load About Page Fail';
export const LOAD_ABOUT_PAGE_SUCCESS = '[Application] Load About Page Success';

export class LoadAboutPage implements Action {
  readonly type = LOAD_ABOUT_PAGE;
}

export class LoadAboutPageFail implements Action {
  readonly type = LOAD_ABOUT_PAGE_FAIL;
  constructor(public payload: any) {}
}

export class LoadAboutPageSuccess implements Action {
  readonly type = LOAD_ABOUT_PAGE_SUCCESS;
  constructor(public payload: About) {}
}

/**
 * Load AboutPage
 */
export const UPDATE_ABOUT_PAGE = '[Application] Update About Page';
export const UPDATE_ABOUT_PAGE_FAIL = '[Application] Update About Page Fail';
export const UPDATE_ABOUT_PAGE_SUCCESS = '[Application] Update About Page Success';

export class UpdateAboutPage implements Action {
  readonly type = UPDATE_ABOUT_PAGE;
  constructor(public pageData: About) {}
}

export class UpdateAboutPageFail implements Action {
  readonly type = UPDATE_ABOUT_PAGE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateAboutPageSuccess implements Action {
  readonly type = UPDATE_ABOUT_PAGE_SUCCESS;
  constructor(public payload: About) {}
}


/**
 * Action Types
 */
export type AboutPageAction =
  | LoadAboutPage
  | LoadAboutPageSuccess
  | LoadAboutPageFail
  | UpdateAboutPage
  | UpdateAboutPageSuccess
  | UpdateAboutPageFail;
