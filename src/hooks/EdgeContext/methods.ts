import { EdgeAccountOptions, EdgeContext, EdgeEdgeLoginOptions } from 'edge-core-js'
import { useMutation } from 'react-query'

export const useClose = (context: EdgeContext) => {
  const [close, { ...rest }] = useMutation(() => context.close())

  return { close, pending: rest.status === 'loading', ...rest }
}

export const useCreateAccount = (context: EdgeContext) => {
  const [
    createAccount,
    { data: account, ...rest },
  ] = useMutation(
    ({
      username,
      password,
      pin,
      options,
    }: {
      username: string
      password: string
      pin?: string
      options?: EdgeAccountOptions
    }) => context.createAccount(username, password, pin, options),
  )

  return { account, createAccount, pending: rest.status === 'loading', ...rest }
}

export const useLoginWithKey = (context: EdgeContext) => {
  const [
    loginWithKey,
    { data, ...rest },
  ] = useMutation(
    ({ username, loginKey, options }: { username: string; loginKey: string; options?: EdgeAccountOptions }) =>
      context.loginWithKey(username, loginKey, options),
  )

  return { loginWithKey, account: data, pending: rest.status === 'loading', ...rest }
}

export const useLoginWithPassword = (context: EdgeContext) => {
  const [
    loginWithPassword,
    { data, ...rest },
  ] = useMutation(
    ({ username, password, options }: { username: string; password: string; options?: EdgeAccountOptions }) =>
      context.loginWithPassword(username, password, options),
  )

  return { loginWithPassword, account: data, pending: rest.status === 'loading', ...rest }
}

export const useLoginWithPin = (context: EdgeContext) => {
  const [
    loginWithPIN,
    { data, ...rest },
  ] = useMutation(({ username, pin, options }: { username: string; pin: string; options?: EdgeAccountOptions }) =>
    context.loginWithPIN(username, pin, options),
  )

  return { loginWithPIN, account: data, pending: rest.status === 'loading', ...rest }
}

export const useLoginWithRecovery = (context: EdgeContext) => {
  const [
    loginWithRecovery,
    { data, ...rest },
  ] = useMutation(
    ({
      username,
      recoveryKey,
      answers = [],
      options,
    }: {
      username: string
      answers: string[]
      recoveryKey: string
      options: EdgeAccountOptions
    }) => context.loginWithRecovery2(recoveryKey, username, answers, options),
  )

  return { loginWithRecovery, account: data, pending: rest.status === 'loading', ...rest }
}

export const useDeleteLocalAccount = (context: EdgeContext) => {
  const [deleteLocalAccount, { ...rest }] = useMutation(({ username }: { username: string }) =>
    context.deleteLocalAccount(username),
  )

  return { deleteLocalAccount, pending: rest.status === 'loading', ...rest }
}

export const useRequestEdgeLogin = (context: EdgeContext) => {
  const [requestEdgeLogin, { data, ...rest }] = useMutation(({ options }: { options: EdgeEdgeLoginOptions }) =>
    context.requestEdgeLogin(options),
  )

  return { requestEdgeLogin, pendingEdgeLogin: data, pending: rest.status === 'loading', ...rest }
}

export const useRequestOtpReset = (context: EdgeContext) => {
  const [
    requestOtpReset,
    { data, ...rest },
  ] = useMutation(({ username, otpResetToken }: { username: string; otpResetToken: string }) =>
    context.requestOtpReset(username, otpResetToken),
  )

  return { requestOtpReset, resetDate: data, pending: rest.status === 'loading', ...rest }
}
