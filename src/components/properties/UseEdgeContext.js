// @flow

import { type EdgeContext } from 'edge-core-js'
import React, { type Node } from 'react'

type Props = {|
  children: EdgeContext => Node,
  context: EdgeContext,
  watch: Array<$Keys<EdgeContext>>,
|}

export class UseEdgeContext extends React.Component<Props> {
  unsubscribes: Array<Function> = []
  mounted: boolean = false

  componentDidMount() {
    const { context, watch: properties } = this.props
    this.mounted = true
    this.unsubscribes = properties.map(property => context.watch(property, () => this.safeUpdate()))
  }

  componentWillUnmount() {
    this.mounted = false
    this.unsubscribes.forEach(fn => fn())
  }

  render() {
    const { children, context } = this.props
    return children(context)
  }

  safeUpdate = () => this.mounted && this.forceUpdate()
}
