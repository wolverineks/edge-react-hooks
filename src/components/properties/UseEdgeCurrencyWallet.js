// @flow

import { type EdgeCurrencyWallet } from 'edge-core-js'
import React, { type Node } from 'react'

type Props = {|
  children: EdgeCurrencyWallet => Node,
  wallet: EdgeCurrencyWallet,
  watch: Array<$Keys<EdgeCurrencyWallet>>
|}

export class UseEdgeCurrencyWallet extends React.Component<Props> {
  unsubscribes: Array<Function> = []
  mounted: boolean = false

  componentDidMount() {
    const { wallet, watch: properties } = this.props
    this.mounted = true
    this.unsubscribes = properties.map(property => wallet.watch(property, () => this.safeUpdate()))
  }

  componentWillUnmount() {
    this.mounted = false
    this.unsubscribes.forEach(fn => fn())
  }

  render() {
    const { children, wallet } = this.props
    return children(wallet)
  }

  safeUpdate = () => this.mounted && this.forceUpdate()
}
