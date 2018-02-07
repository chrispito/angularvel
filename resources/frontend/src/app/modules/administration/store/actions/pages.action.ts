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
 * Action Types
 */
export type AboutPageAction =
  | LoadAboutPage
  | LoadAboutPageSuccess
  | LoadAboutPageFail;
