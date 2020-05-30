import {
  EdgeAccount,
  EdgeCreateCurrencyWalletOptions,
  EdgeWalletState,
  EdgeWalletStates,
  EthereumTransaction,
  JsonObject,
} from 'edge-core-js'
import { useMutation } from 'react-query'

export const useEnableOtp = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(({ timeout }: { timeout?: number }) => account.enableOtp(timeout))

  return { execute, ...rest }
}

export const useDisableOtp = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(() => account.disableOtp())

  return { execute, ...rest }
}

export const useCancelOtpReset = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(() => account.cancelOtpReset())

  return { execute, ...rest }
}

export const useLogout = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(() => account.logout())

  return { execute, ...rest }
}

export const useChangeRecovery = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(({ questions, answers }: { questions: string[]; answers: string[] }) =>
    account.changeRecovery(questions, answers),
  )

  return { execute, ...rest }
}

export const useDeleteRecovery = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(() => account.deleteRecovery())

  return { execute, ...rest }
}

export const useChangePin = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(({ options }: { options: { enableLogin?: boolean; pin?: string } }) =>
    account.changePin(options),
  )

  return { execute, ...rest }
}

export const useDeletePin = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(() => account.deletePin())

  return { execute, ...rest }
}

export const useDeletePassword = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(() => account.deletePassword())

  return { execute, ...rest }
}

export const useChangePassword = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(({ password }: { password: string }) => account.changePassword(password))

  return { execute, ...rest }
}

export const useSignEthereumTransaction = (account: EdgeAccount) => {
  const [
    execute,
    rest,
  ] = useMutation(({ walletId, transaction }: { walletId: string; transaction: EthereumTransaction }) =>
    account.signEthereumTransaction(walletId, transaction),
  )

  return { execute, ...rest }
}

export const useCreateWallet = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(({ type, keys }: { type: string; keys?: JsonObject }) =>
    account.createWallet(type, keys),
  )

  return { execute, ...rest }
}

export const useCreateCurrencyWallet = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(({ type, options }: { type: string; options: EdgeCreateCurrencyWalletOptions }) =>
    account.createCurrencyWallet(type, options),
  )

  return { execute, ...rest }
}

export const useChangeWalletStates = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(({ walletStates }: { walletStates: EdgeWalletStates }) =>
    account.changeWalletStates(walletStates),
  )

  return { execute, ...rest }
}

export const useChangeWalletState = (account: EdgeAccount) => {
  const [execute, rest] = useMutation(({ walletId, walletState }: { walletId: string; walletState: EdgeWalletState }) =>
    account.changeWalletStates({ [walletId]: walletState }),
  )

  return { execute, ...rest }
}
