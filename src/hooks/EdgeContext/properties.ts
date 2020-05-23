import { EdgeContext } from 'edge-core-js'
import * as React from 'react'
import { useMutation } from 'react-query'

export const useLoginMessages = (context: EdgeContext) => {
  const [execute, { data: loginMessages, reset: _reset, ...rest }] = useMutation(() => context.fetchLoginMessages())
  React.useEffect(() => {
    execute()
  }, [execute, context])

  return { loginMessages, pending: rest.status === 'loading', ...rest }
}

export const useRecoveryQuestionChoices = (context: EdgeContext) => {
  const [execute, { data: recoveryQuestionChoices, reset: _reset, ...rest }] = useMutation(() =>
    context.listRecoveryQuestionChoices(),
  )
  React.useEffect(() => {
    execute()
  }, [execute, context])

  return { recoveryQuestionChoices, pending: rest.status === 'loading', ...rest }
}

export const useRecoveryQuestions = (
  context: EdgeContext,
  { username, recoveryKey }: { username: string; recoveryKey: string },
) => {
  const [execute, { data: recoveryQuestions, reset: _reset, ...rest }] = useMutation(() =>
    context.fetchRecovery2Questions(recoveryKey, username),
  )
  React.useEffect(() => {
    execute()
  }, [execute, context, username, recoveryKey])

  return { recoveryQuestions, pending: rest.status === 'loading', ...rest }
}

export const useRecoveryKey = (context: EdgeContext, { username }: { username: string }) => {
  const [execute, { data: recoveryKey, reset: _reset, ...rest }] = useMutation(() => context.getRecovery2Key(username))
  React.useEffect(() => {
    execute()
  }, [execute, context, username])

  return { recoveryKey, pending: rest.status === 'loading', ...rest }
}

export const useUsernameAvailable = (context: EdgeContext, { username }: { username: string }) => {
  const [execute, { data: usernameAvailable, reset: _reset, ...rest }] = useMutation(() =>
    context.usernameAvailable(username),
  )
  React.useEffect(() => {
    execute()
  }, [execute, context, username])

  return { usernameAvailable, pending: rest.status === 'loading', ...rest }
}

export const usePinLoginEnabled = (context: EdgeContext, { username }: { username: string }) => {
  const [execute, { data: pinLoginEnabled, reset: _reset, ...rest }] = useMutation(() =>
    context.pinLoginEnabled(username),
  )
  React.useEffect(() => {
    execute()
  }, [execute, context, username])

  return { pinLoginEnabled, pending: rest.status === 'loading', ...rest }
}
