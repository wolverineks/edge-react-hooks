import { EdgeContext } from 'edge-core-js'
import React from 'react'
import { useMutation } from 'react-query'

export const useRecoveryQuestionChoices = (context: EdgeContext) => {
  const [execute, rest] = useMutation(context.listRecoveryQuestionChoices)

  React.useEffect(() => {
    execute()
  }, [execute, context])

  return { execute, ...rest }
}

export const useLoginMessages = (context: EdgeContext, { username }: { username: string }) => {
  const [execute, rest] = useMutation(() => context.fetchLoginMessages().then((messages) => messages[username]))

  React.useEffect(() => {
    execute()
  }, [execute, context, username])

  return { execute, ...rest }
}

export const useRecoveryQuestions = (
  context: EdgeContext,
  { username, recoveryKey }: { username: string; recoveryKey: string },
) => {
  const [execute, rest] = useMutation(() => context.fetchRecovery2Questions(recoveryKey, username))

  React.useEffect(() => {
    execute()
  }, [execute, context, username, recoveryKey])

  return { execute, ...rest }
}

export const useRecoveryKey = (context: EdgeContext, { username }: { username: string }) => {
  const [execute, rest] = useMutation(() => context.getRecovery2Key(username))

  React.useEffect(() => {
    execute()
  }, [execute, context, username])

  return { execute, ...rest }
}

export const useUsernameAvailable = (context: EdgeContext, { username }: { username: string }) => {
  const [execute, rest] = useMutation(() => context.usernameAvailable(username))

  React.useEffect(() => {
    execute()
  }, [execute, context, username])

  return { execute, ...rest }
}

export const usePinLoginEnabled = (context: EdgeContext, { username }: { username: string }) => {
  const [execute, rest] = useMutation(() => context.pinLoginEnabled(username))

  React.useEffect(() => {
    execute()
  }, [execute, context, username])

  return { execute, ...rest }
}
