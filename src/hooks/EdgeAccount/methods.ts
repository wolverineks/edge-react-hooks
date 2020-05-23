import {
  EdgeAccount,
  EdgeCreateCurrencyWalletOptions,
  EdgeCurrencyWallet,
  EdgeWalletState,
  EdgeWalletStates,
  EthereumTransaction,
  JsonObject,
} from 'edge-core-js'
import { useMutation } from 'react-query'

export const useEnableOtp = (account: EdgeAccount) => {
  const [execute, { ...rest }] = useMutation(({ timeout }: { timeout?: number }) => account.enableOtp(timeout))

  return { enableOtp: execute, pending: rest.status === 'loading', ...rest }
}

export const useDisableOtp = (account: EdgeAccount) => {
  const [execute, { ...rest }] = useMutation(() => account.disableOtp())

  return { disableOtp: execute, pending: rest.status === 'loading', ...rest }
}

export const useCancelOtpReset = (account: EdgeAccount) => {
  const [execute, { ...rest }] = useMutation(() => account.cancelOtpReset())

  return { cancelOtpReset: execute, pending: rest.status === 'loading', ...rest }
}

export const useLogout = (account: EdgeAccount) => {
  const [execute, { ...rest }] = useMutation(() => account.logout())

  return { logout: execute, pending: rest.status === 'loading', ...rest }
}

export const useChangeRecovery = (account: EdgeAccount) => {
  const [
    execute,
    { data, ...rest },
  ] = useMutation(({ questions, answers }: { questions: string[]; answers: string[] }) =>
    account.changeRecovery(questions, answers),
  )

  return { changeRecovery: execute, recovery: data, pending: rest.status === 'loading', ...rest }
}

export const useDeleteRecovery = (account: EdgeAccount) => {
  const [execute, { ...rest }] = useMutation(() => account.deleteRecovery())

  return { deleteRecovery: execute, pending: rest.status === 'loading', ...rest }
}

export const useChangePin = (account: EdgeAccount) => {
  const [execute, { data, ...rest }] = useMutation(({ options }: { options: { pin?: string } }) =>
    account.changePin(options),
  )

  return { changePin: execute, pin: data, pending: rest.status === 'loading', ...rest }
}

export const useDeletePin = (account: EdgeAccount) => {
  const [execute, { ...rest }] = useMutation(() => account.deletePin())

  return { deletePin: execute, pending: rest.status === 'loading', ...rest }
}

export const useDeletePassword = (account: EdgeAccount) => {
  const [execute, { ...rest }] = useMutation(() => account.deletePassword())

  return { deletePassword: execute, pending: rest.status === 'loading', ...rest }
}

export const useChangePassword = (account: EdgeAccount) => {
  const [execute, { ...rest }] = useMutation(({ password }: { password: string }) => account.changePassword(password))

  return { changePassword: execute, pending: rest.status === 'loading', ...rest }
}

export const useSignEthereumTransaction = (account: EdgeAccount) => {
  const [
    execute,
    { data, ...rest },
  ] = useMutation(({ walletId, transaction }: { walletId: string; transaction: EthereumTransaction }) =>
    account.signEthereumTransaction(walletId, transaction),
  )

  return { data, signEthereumTransaction: execute, pending: rest.status === 'loading', ...rest }
}

export const useCreateWallet = (account: EdgeAccount) => {
  const [execute, { data, ...rest }] = useMutation(({ type, keys }: { type: string; keys?: JsonObject }) =>
    account.createWallet(type, keys),
  )

  return { createWallet: execute, data, pending: rest.status === 'loading', ...rest }
}

export const useCreateCurrencyWallet = (account: EdgeAccount) => {
  const [
    execute,
    { data, ...rest },
  ] = useMutation(({ type, options }: { type: string; options: EdgeCreateCurrencyWalletOptions }) =>
    account.createCurrencyWallet(type, options),
  )

  return { createCurrencyWallet: execute, wallet: data, pending: rest.status === 'loading', ...rest }
}

export const useChangeWalletStates = (account: EdgeAccount) => {
  const [execute, { ...rest }] = useMutation(({ walletStates }: { walletStates: EdgeWalletStates }) =>
    account.changeWalletStates(walletStates),
  )

  return { changeWalletStates: execute, pending: rest.status === 'loading', ...rest }
}

export const useChangeWalletState = (account: EdgeAccount) => {
  const [
    execute,
    { ...rest },
  ] = useMutation(({ walletId, walletState }: { walletId: string; walletState: EdgeWalletState }) =>
    account.changeWalletStates({ [walletId]: walletState }),
  )

  return { changeWalletState: execute, pending: rest.status === 'loading', ...rest }
}
