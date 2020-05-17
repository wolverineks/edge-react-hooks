declare module 'edge-currency-bitcoin'
declare module 'edge-currency-monero'

// import { EdgeIo, PluginIo } from '../../../../src/types'

// export function makeNodeIo(io: EdgeIo): PluginIo

// export type EdgeSecp256k1 = {
//   publicKeyCreate: (privateKey: Uint8Array, compressed: boolean) => Promise<string>
//   privateKeyTweakAdd: (privateKey: Uint8Array, tweak: Uint8Array) => Promise<Uint8Array>
//   publicKeyTweakAdd: (publicKey: Uint8Array, tweak: Uint8Array, compressed: boolean) => Promise<Uint8Array>
// }

// export type EdgePbkdf2 = {
//   deriveAsync: (key: Uint8Array, salt: Uint8Array, iter: number, len: number, algo: string) => Promise<Uint8Array>
// }

// /**
//  * Wrapper for TCP sockets with event & method names based on WebSocket.
//  */
// export type EdgeSocket = {
//   readonly on: Subscriber<{
//     close: void // The socket is closed for any reason.
//     error: any // An network error occurred.
//     message: string // The socket has received data.
//     open: void // The socket is opened.
//   }>

//   /**
//    * Connects to a server & resolves when finished.
//    * Must only be called once.
//    */
//   connect(): Promise<unknown>

//   /**
//    * Transmits data to the server. Must only be called on open sockets.
//    */
//   send(data: string): Promise<unknown>

//   /**
//    * Shuts down the socket. No other methods are callable after this.
//    */
//   close(): Promise<unknown>
// }

// export type EdgeSocketOptions = {
//   host: string
//   port?: number
//   type: 'tcp' | 'tls'
// }

// /**
//  * Wraps a Node-style socket into an EdgeSocket.
//  */
// export function makeEdgeSocket(socket: net$Socket, opts: EdgeSocketOptions): EdgeSocket {
//   const out: EdgeSocket = {
//     on: onMethod,

//     async connect(): Promise<unknown> {
//       socket.setEncoding('utf8')
//       socket.on('close', (hadError: boolean) => emit(out, 'close'))
//       socket.on('error', (error: Error) => emit(out, 'error', error))
//       socket.on('data', (data: string) => emit(out, 'message', String(data)))
//       socket.on('connect', () => emit(out, 'open'))
//       socket.connect({ host: opts.host, port: opts.port })
//     },

//     send(data: string) {
//       socket.write(data, 'utf8')
//       return Promise.resolve()
//     },

//     close() {
//       socket.destroy()
//       return Promise.resolve()
//     },
//   }
//   bridgifyObject(out)
//   return out
// }

// /**
//  * The extra things we need to add to the EdgeIo object.
//  */
// export type ExtraIo = {
//   readonly secp256k1?: EdgeSecp256k1
//   readonly pbkdf2?: EdgePbkdf2
//   makeSocket(opts: EdgeSocketOptions): Promise<EdgeSocket>
// }

// /**
//  * The IO object this plugin uses internally.
//  */
// export type PluginIo = EdgeIo & ExtraIo

// export type RawTx = string
// export type BlockHeight = number
// export type Txid = string

// export type Script = {
//   type: string
//   params?: Array<string>
// }

// export type Output = {
//   address?: string
//   script?: Script
//   value: number
// }

// export type StandardOutput = {
//   address: string
//   value: number
// }

// export type Utxo = {
//   tx: any
//   index: number
//   height?: BlockHeight
// }

// export type TxOptions = {
//   utxos?: Array<Utxo>
//   setRBF?: boolean
//   RBFraw?: RawTx
//   CPFP?: Txid
//   CPFPlimit?: number
//   selection?: string
//   subtractFee?: boolean
// }

// export type CreateTxOptions = {
//   utxos: Array<Utxo>
//   rate: number
//   changeAddress: string
//   network: string
//   outputs?: Array<StandardOutput>
//   height?: BlockHeight
//   estimate?: Function
//   txOptions: TxOptions
// }

// export type BitcoinFees = {
//   lowFee: string
//   standardFeeLow: string
//   standardFeeHigh: string

//   // The amount of satoshis which will be charged the standardFeeLow
//   standardFeeLowAmount: string

//   // The amount of satoshis which will be charged the standardFeeHigh
//   standardFeeHighAmount: string
//   highFee: string

//   // The last time the fees were updated
//   timestamp: number
// }

// export type EarnComFee = {
//   minFee: number
//   maxFee: number
//   dayCount: number
//   memCount: number
//   minDelay: number
//   maxDelay: number
//   minMinutes: number
//   maxMinutes: number
// }

// export type EarnComFees = {
//   fees: Array<EarnComFee>
// }

// export type DerivedAddress = {
//   address: string
//   scriptHash: string
//   redeemScript?: string
// }

// export type Branches = {
//   [branchNum: string]: string
// }

// export type FormatSelector = {
//   branches: Branches

//   createMasterPath: Function
//   deriveAddress: Function
//   deriveHdKey: Function
//   deriveKeyRing: Function
//   deriveScriptAddress: Function
//   estimateSize: Function
//   getMasterKeys: Function
//   hasScript: Function
//   keysFromRaw: Function
//   parseSeed: Function
//   setKeyType: Function
//   sign: Function
// }
