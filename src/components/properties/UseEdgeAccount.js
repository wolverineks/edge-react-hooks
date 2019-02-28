// @flow

import { type EdgeAccount } from 'edge-core-js'
import React, { type Node } from 'react'

type Props = {|
  account: EdgeAccount,
  children: EdgeAccount => Node,
  watch: Array<$Keys<EdgeAccount>>,
|}

export class UseEdgeAccount extends React.Component<Props> {
  unsubscribes: Array<Function> = []
  mounted: boolean = false

  componentDidMount() {
    const { account, watch: properties } = this.props
    this.mounted = true
    this.unsubscribes = properties.map(property => account.watch(property, () => this.safeUpdate()))
  }

  componentWillUnmount() {
    this.mounted = false
    this.unsubscribes.forEach(fn => fn())
  }

  render() {
    const { children, account } = this.props
    return children(account)
  }

  safeUpdate = () => this.mounted && this.forceUpdate()
}
