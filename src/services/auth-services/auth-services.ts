/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import {
  ILogin,
  IUserData,
  IUserLoggedData,
  IUserRegister
} from '@/models/user';
import { IGlobalResponse, IGlobalResponseEmpty } from '@/models/common';
import { IAccountPayload } from '@/modules/settings/types';
import { IForgotPasswordForm } from '@/core/static-components/login/forgot-password';
import { IVerifyEmailForm } from '@/core/static-components/verify-email';
import { IChangePasswordForm } from '@/modules/settings/components/account/change-password';
import { IFeedbackModalForm } from '@/core/static-components/feedback-modal';
import { ErrorCallBack, HttpUtil } from '../adapter-config/config';

export interface IGetMeResponse extends IGlobalResponse {
  data: IUserLoggedData;
}
export interface ILoginResponse extends IGlobalResponse {
  data: IUserData;
}
export interface IRegisterResponse extends IGlobalResponse {
  data: IUserRegister;
}

export class AuthService {
  // eslint-disable-next-line no-use-before-define
  private static instance: AuthService | null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!this.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance!;
  }

  public async getMe(onError?: ErrorCallBack): Promise<IGetMeResponse> {
    const res = await HttpUtil.get(
      'api/client/user/Details',
      null,
      false,
      onError
    );
    return res;
  }

  public async login(
    body: ILogin,
    onError?: ErrorCallBack
  ): Promise<ILoginResponse> {
    const res = await HttpUtil.post('api/client/user/Login', body, onError);
    return res;
  }

  public async forgetPassword(
    body: IForgotPasswordForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.post(
      'api/client/user/ResetPassword',
      body,
      onError
    );
    return res;
  }

  public async resetPassword(
    body: IForgotPasswordForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.put(
      'api/client/user/UpdatePassword',
      body,
      onError
    );
    return res;
  }

  public async verifyEmail(
    body: IVerifyEmailForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.post('api/client/user/Verify', body, onError);
    return res;
  }

  public async sendFeedback(
    body: IFeedbackModalForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.post('api/client/user/feedback', body, onError);
    return res;
  }

  public async resendVerificationCode(
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.post(
      'api/client/user/ResendVerificationCode',
      null,
      onError
    );
    return res;
  }

  public async changePassword(
    body: IChangePasswordForm,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.put('api/client/user/Password', body, onError);
    return res;
  }

  public async changeUserDetail(
    body: IAccountPayload,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.put('api/client/user/Details', body, onError);
    return res;
  }

  public async register(
    body: IUserRegister,
    onError?: ErrorCallBack
  ): Promise<IRegisterResponse> {
    const res = await HttpUtil.post('api/client/user/Register', body, onError);
    return res;
  }

  public async removeSession(
    id: number,
    onError?: ErrorCallBack,
    abortController?: AbortController['signal']
  ): Promise<IGlobalResponseEmpty> {
    const res = await HttpUtil.delete(
      `api/client/user/Sessions/${id}`,
      onError,
      abortController
    );
    return res;
  }
}
