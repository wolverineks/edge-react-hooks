import { EdgeAccountOptions, EdgeContext, EdgeEdgeLoginOptions } from 'edge-core-js'
import { useMutation } from 'react-query'

export const useClose = (context: EdgeContext) => {
  const [execute, rest] = useMutation(() => context.close())

  return { execute, ...rest }
}

export const useCreateAccount = (context: EdgeContext) => {
  const [
    execute,
    rest,
  ] = useMutation(
    ({
      username,
      password,
      pin,
      options,
    }: {
      username: string
      password: string
      pin: string
      options?: EdgeAccountOptions
    }) => context.createAccount(username, password, pin, options),
  )

  return { execute, ...rest }
}

export const useLoginWithKey = (context: EdgeContext) => {
  const [
    execute,
    rest,
  ] = useMutation(
    ({ username, loginKey, options }: { username: string; loginKey: string; options?: EdgeAccountOptions }) =>
      context.loginWithKey(username, loginKey, options),
  )

  return { execute, ...rest }
}

export const useLoginWithPassword = (context: EdgeContext) => {
  const [
    execute,
    rest,
  ] = useMutation(
    ({ username, password, options }: { username: string; password: string; options?: EdgeAccountOptions }) =>
      context.loginWithPassword(username, password, options),
  )

  return { execute, ...rest }
}

export const useLoginWithPin = (context: EdgeContext) => {
  const [
    execute,
    rest,
  ] = useMutation(({ username, pin, options }: { username: string; pin: string; options?: EdgeAccountOptions }) =>
    context.loginWithPIN(username, pin, options),
  )

  return { execute, ...rest }
}

export const useLoginWithRecovery = (context: EdgeContext) => {
  const [
    execute,
    rest,
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

  return { execute, ...rest }
}

export const useDeleteLocalAccount = (context: EdgeContext) => {
  const [execute, rest] = useMutation(({ username }: { username: string }) => context.deleteLocalAccount(username))

  return { execute, ...rest }
}

export const useRequestEdgeLogin = (context: EdgeContext) => {
  const [execute, rest] = useMutation(({ options }: { options: EdgeEdgeLoginOptions }) =>
    context.requestEdgeLogin(options),
  )

  return { execute, ...rest }
}

export const useRequestOtpReset = (context: EdgeContext) => {
  const [execute, rest] = useMutation(({ username, otpResetToken }: { username: string; otpResetToken: string }) =>
    context.requestOtpReset(username, otpResetToken),
  )

  return { execute, ...rest }
}
